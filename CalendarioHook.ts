import { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment-timezone';

import appointmentServices from '../../services/appointment';
import useGlobalState from '../hooks/stateHook';
import { mainEmail } from '../PersonalData/PersonalDataUtils';
import { appointmentStatus, descriptionFecha } from './CalendarioUtils';
import { PersonInterface } from '../../interface/globalInterface';
import useVideoCall from '../VideoCall/VideoCallHook';
import { comebackToInit } from '../../utils';

const useCalendario = () => {
  const { getListAvailability, createAppointment, updateAppoimnet } = appointmentServices();

  const {
    customerSchedules: { branchId, scheduleId },
    routes,
    setAppointment,
    personalData,
    getPersonalDataById,
  } = useGlobalState();

  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(false);
  const [statusAppointment, setStatusAppointment] = useState({
    status: appointmentStatus.waitingToBeDated,
    fecha: '',
    hora: '',
    step: 1,
  });

  const [state, setState] = useState<{
    datesEnabled: any[];
    datesDisabled: any[];
    timesEnabled: any[];
    loading: boolean;
  }>({
    datesEnabled: [],
    datesDisabled: [],
    timesEnabled: [],
    loading: true,
  });

  const [fechas, setFechas] = useState<any[]>([]);

  const { setShowRoomAppointment } = useVideoCall();

  const router = useRouter();

  const handleScheduleAppointment = () => {
    setScheduleAppointment(!scheduleAppointment);
  };

  const turnOffAppointment = (logEvent: Function, datail: string) => {
    router.push(routes.pathOrigin);
    handleScheduleAppointment();
    logEvent('click', {
      click_type: 'button',
      click_detail: datail,
      flow: 'obi queue atencion virtual',
    });
    if (routes.pathOrigin === '/videoCall') {
      setShowRoomAppointment(false);
      sessionStorage.setItem('refresh', 'true');
      sessionStorage.setItem('reConnections', 'true');
    }
  };

  const handleCancelAppoinment = async (
    setShowAlertCancel: Function,
    setCallPending: Function,
    logEvent: Function,
  ) => {
    const bodyAppoinment = JSON.parse(
      sessionStorage.getItem('appoinment') || '{}',
    );
    setShowAlertCancel(false);
    try {
      if (setCallPending) setCallPending(true);
      logEvent('click', {
        click_type: 'button',
        click_detail: 'confirmar cancelar turno',
        flow: 'obi queue atencion virtual',
      });
      const appoinment = await updateAppoimnet(bodyAppoinment, logEvent);
      if (appoinment.status === 'CANCELED') {
        comebackToInit(logEvent, false);
      }
    } catch (error) {
      console.log(error);
      if (setCallPending) setCallPending(false);
    }
  };

  const getAllData = async (fecha: string, handleLogEvent: Function) => {
    const arrFechas: string[] = [];
    const dateNextMonth = moment
      .tz('America/Argentina/Buenos_Aires')
      .add(1, 'months')
      .format('YYYY-MM-DDT00:00:00ZZ');
    arrFechas.push(fecha);
    arrFechas.push(dateNextMonth);
    const allRequest = arrFechas.map((response) => getListAvailability(response, branchId, scheduleId, handleLogEvent)
      .then((res) => res));
    const agenda = await Promise.all(allRequest);
    if (agenda[0] && agenda[0].response) {
      setStatusAppointment({
        ...statusAppointment,
        status: appointmentStatus.errorIndefinido,
      });
    }
    return agenda[0] && agenda[0].response ? [] : agenda;
  };

  const getArrayThree = (agenda: any[]) => {
    let datesEnabled = '';
    let timesTmp: any[] = [];
    const arrThree: any[] = [];

    if (agenda.length > 0 && !agenda[0].error) {
      agenda.forEach(({ slots }) => slots.forEach((resp: { startDate: string; availability: number }) => {
        if (
          datesEnabled !== resp.startDate.split('T')[0]
            && arrThree.length <= 2
            && resp.availability > 0
        ) {
          const [dataStart] = resp.startDate.split('T');
          if (timesTmp.length !== 0) {
            const newElement = {
              id: +1,
              description: descriptionFecha(datesEnabled, 0),
              date: moment(datesEnabled).format('YYYY-MM-DD'),
              times: timesTmp,
            };
            if (arrThree.length <= 2) arrThree.push(newElement);
            datesEnabled = dataStart;
            timesTmp = [resp.startDate.split('T')[1].slice(0, 5)];
          } else {
            datesEnabled = dataStart;
            timesTmp = [resp.startDate.split('T')[1].slice(0, 5)];
          }
        } else if (resp.availability > 0) {
          timesTmp = [...timesTmp, resp.startDate.split('T')[1].slice(0, 5)];
        }
      }));
      return arrThree;
    }
    return [];
  };

  const fetchThreeDays = async (fecha: string, handleLogEvent: Function) => {
    await getAllData(fecha, handleLogEvent).then((agenda) => {
      const resultado: any[] | [] = getArrayThree(agenda);
      setFechas(resultado);
    });
  };

  const getArrayDates = async (slots: any[], fecha: string) => {
    let fechaS: string[] = [];
    let datesEnabled: string[] = [];
    let datesDisabled: string[] = [];
    let timesEnabled: any[] = [];
    let times: string[] = [];
    let diaActual: number | string = 0;

    const firstDate = new Date(fecha);
    const lastDay = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0,
    );
    const long = lastDay.getDate() - firstDate.getDate();

    for (let i = 0; i <= long; i++) {
      const fec = firstDate;
      fechaS = [...fechaS, fec.toISOString().split('T')[0]];
      fec.setDate(fec.getDate() + 1);
    }

    slots.forEach((resp) => {
      if (
        !datesEnabled.includes(resp.startDate.split('T')[0])
        && resp.availability > 0
      ) {
        datesEnabled = [...datesEnabled, resp.startDate.split('T')[0]];
        if (diaActual === 0) {
          diaActual = moment(resp.startDate.split('T')[0]).format('DD');
          times = [resp.startDate.split('T')[1].slice(0, 5)];
        } else {
          timesEnabled = [
            ...timesEnabled,
            {
              day: diaActual,
              times,
            },
          ];
          diaActual = moment(resp.startDate.split('T')[0]).format('DD');
          times = [resp.startDate.split('T')[1].slice(0, 5)];
        }
      } else if (resp.availability > 0) {
        times = [...times, resp.startDate.split('T')[1].slice(0, 5)];
      }
    });
    timesEnabled = [
      ...timesEnabled,
      {
        day: diaActual,
        times,
      },
    ];

    datesDisabled = fechaS.filter((f) => {
      if (!datesEnabled.includes(f)) {
        return f;
      }
    });
    return {
      datesEnabled,
      datesDisabled,
      timesEnabled,
    };
  };

  const fetchCalendario = async (fecha: string, handleLogEvent: Function) => {
    const resultado = await getListAvailability(
      fecha,
      branchId,
      scheduleId,
      handleLogEvent,
    );
    if (resultado && !resultado.slots) {
      setStatusAppointment({
        status: appointmentStatus.outOfService,
        fecha: '',
        hora: '',
        step: 1,
      });
    } else {
      const { slots } = resultado;
      if (slots.length) {
        getArrayDates(slots, fecha).then((datos) => {
          setState({
            datesEnabled: datos.datesEnabled,
            datesDisabled: datos.datesDisabled,
            timesEnabled: datos.timesEnabled,
            loading: false,
          });
        });
      } else {
        setState({
          datesEnabled: [],
          datesDisabled: [],
          timesEnabled: [],
          loading: false,
        });
      }
    }
  };

  const confirmAppointment = async (
    fecha: string,
    bodyCancelAppoinment: any,
    handleLogEvent: Function,
  ) => {
    let data = {
      branch: { id: branchId },
      schedule: { id: scheduleId },
      startAt: fecha,
      customer: {
        firstName: personalData.firstName.value,
        lastName: personalData.lastName.value,
        dni: personalData.idNumber.value,
        email: personalData.email.value,
        customerNumber: `${personalData.pais_nacimiento}${personalData.tipo_documento}${personalData.idNumber.value}`,
      },
      reason: 'Plataforma de Citas por Hub-virtual',
    };
    const validData = !personalData.firstName.value
      && !personalData.lastName.value
      && !personalData.idNumber.value
      && !personalData.email.value;
    let result: PersonInterface;
    if (validData) {
      result = await getPersonalDataById(handleLogEvent);
      data = {
        ...data,
        customer: {
          firstName: result.nombre,
          lastName: result.apellido,
          dni: result.numero_documento,
          email: result.emails.length ? mainEmail(result.emails) : '',
          customerNumber: `${result.pais_nacimiento}${result.tipo_documento}${result.numero_documento}`,
        },
      };
    }
    const resultado = await createAppointment(data, handleLogEvent);
    await setAppointment(
      { numero_documento: data.customer.dni },
      handleLogEvent,
    );
    bodyCancelAppoinment(resultado, fecha);
    return resultado;
  };

  return {
    fetchCalendario,
    state,
    confirmAppointment,
    fetchThreeDays,
    fechas,
    scheduleAppointment,
    setScheduleAppointment,
    confirmedAppointment,
    setConfirmedAppointment,
    handleScheduleAppointment,
    statusAppointment,
    setStatusAppointment,
    turnOffAppointment,
    handleCancelAppoinment,
  };
};

export default useCalendario;
