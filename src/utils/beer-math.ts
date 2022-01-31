interface SrmGrainData {
  lovibond: number;
  pounds: number;
}

export const calculateSrm = (
  batchSizeGallons: number,
  grains: SrmGrainData[]
): number => {
  let srm: number = 0;
  grains.forEach((grain: SrmGrainData) => {
    if (grain.lovibond && grain.pounds) {
      srm += (grain.pounds * grain.lovibond) / batchSizeGallons;
    }
  });

  srm = 1.4922 * srm ** 0.6859;

  srm = Math.round(srm);

  return srm;
};
