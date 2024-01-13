export const charDonnutColors = {
  backgroundColors: [
    'rgba(75, 255, 192, 0.7)',
    'rgba(0, 0, 0, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(13, 80, 255, 0.7)',
    'rgba(255, 206, 86, 0.7)',
  ],
  borderColors: [
    'rgba(75, 255, 192, 1)',
    'rgba(0, 0, 0, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(13, 80, 255, 1)',
    'rgba(255, 206, 86, 1)',
  ],
};

export const lineChartColors = {
  backgroundColors: [],
  borderColors: 'blue',
};

export const initChartconf = {
  barChartXaxisLabels: Array.from(
    { length: 12 },
    (_, index) => (index + 1) * 10
  ),
  excelentClassLabelName: 'Excelente Clase',
  iDonotGetItLabelName: 'No Entiendo',
  sleepLabelName: 'Tengo Sueño',
  takeBreakLabelName: 'Tomar un descanso',
};
