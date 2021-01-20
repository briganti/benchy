const roundPerThousandth = value => {
  return Math.floor((value || 0) * 1000) / 1000;
};

const average = values => {
  return values.reduce((a, b) => a + b, 0) / values.length;
};

const relativeStandardDerivation = values => {
  const avg = average(values);
  const div = 1 / (values.length - 1);
  const sum = values.reduce((a, b) => a + Math.pow(b - avg, 2), 0);

  return roundPerThousandth(Math.sqrt(div * sum) / avg);
};

exports.average = average;
exports.relativeStandardDerivation = relativeStandardDerivation;
