interface SrmGrainData {
  lovibond: number;
  pounds: number;
}

interface OgGrainData {
  pounds: number;
  potential: number;
}

export const calculateSrm = (
  batchSizeGallons: number,
  grains: SrmGrainData[]
): number => {
  let srm = 0;
  grains.forEach((grain: SrmGrainData) => {
    if (grain.lovibond && grain.pounds) {
      srm += (grain.pounds * grain.lovibond) / batchSizeGallons;
    }
  });

  srm = 1.4922 * srm ** 0.6859;

  srm = Math.round(srm);

  return srm;
};

export const calculateOg = (
  grains: OgGrainData[],
  batchSizeGallons: number,
  efficiency: number
): number => {
  const unadjustedOg = grains.reduce((og, { potential, pounds }) => {
    if (potential <= 0 || pounds <= 0) {
      return og;
    }
    const points = potential - 1;
    return (og += points * pounds);
  }, 0);

  const actualEfficiency = efficiency / 100;

  const efficiencyOg = unadjustedOg * actualEfficiency;

  const adjustedOg = efficiencyOg / batchSizeGallons;

  return Math.round((adjustedOg + 1) * 1000) / 1000;
};
