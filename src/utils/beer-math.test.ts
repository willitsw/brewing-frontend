import { recipeFixtures } from "../test-utils/fixtures/recipe-fixtures";
import { brewSettingsFixtures } from "../test-utils/fixtures/brew-settings-fixtures";
import { getStats } from "./beer-math";

describe("getStats", () => {
  it("produces the right stats with imperial recipe and imperial brew settings", () => {
    const result = getStats(
      recipeFixtures.getImperialRecipe(),
      brewSettingsFixtures.getImperialSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(8.0625);
    expect(result.waterLoss).toBe(3.5625);
  });

  it("produces the right stats with metric recipe and imperial brew settings", () => {
    const result = getStats(
      recipeFixtures.getMetricRecipe(),
      brewSettingsFixtures.getImperialSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(30.52);
    expect(result.waterLoss).toBe(13.49);
  });

  it("produces the right stats with mixed recipe and imperial brew settings", () => {
    const result = getStats(
      recipeFixtures.getMetricAndImperialMixedRecipe(),
      brewSettingsFixtures.getImperialSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(8.0625);
    expect(result.waterLoss).toBe(3.5625);
  });

  it("produces the right stats with imperial recipe and metric brew settings", () => {
    const result = getStats(
      recipeFixtures.getImperialRecipe(),
      brewSettingsFixtures.getMetricSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(8.0625);
    expect(result.waterLoss).toBe(3.5625);
  });

  it("produces the right stats with metric recipe and metric brew settings", () => {
    const result = getStats(
      recipeFixtures.getMetricRecipe(),
      brewSettingsFixtures.getMetricSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(30.52);
    expect(result.waterLoss).toBe(13.49);
  });

  it("produces the right stats with mixed recipe and metric brew settings", () => {
    const result = getStats(
      recipeFixtures.getMetricAndImperialMixedRecipe(),
      brewSettingsFixtures.getMetricSettings()
    );

    expect(result.abv).toBe(6.3);
    expect(result.fg).toBe(1.014);
    expect(result.hotLiquor).toBe(0);
    expect(result.ibu).toBe(62);
    expect(result.og).toBe(1.062);
    expect(result.srm).toBe(3);
    expect(result.strikeWater).toBe(8.0625);
    expect(result.waterLoss).toBe(3.5625);
  });
});
