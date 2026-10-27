// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: eb4b2d0efeda77f4ae3b98af880dd44fd9d390f0f6a531c86969774a822f784f)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** hand-added - Details tab load-check (feature_SingleProportion precedent) */
  btn_Details(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Details', { dynamicArgs });
  }

  /** hand-added - same #spinner loading overlay as the login flow's div_Spinner, scoped to ResultsPage for the Details-tab load-check */
  div_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'div_Spinner', { dynamicArgs });
  }

  /** hand-added - the Details tab's Plotly chart container (div.js-plotly-plot). id confirmed on feature_SingleProportion via dumpSubtree - SCREENSHOT-VERIFY it's the same here on first live run */
  div_Details_Chart(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'div_Details_Chart', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Power', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Type_1_Error', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Difference_of_Means_for(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Difference_of_Means_for', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_Upper_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Upper_Type_1_Error', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_Lower_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Lower_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_Difference_of_Means_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Difference_of_Means_SP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Treatment_t', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Noninferiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Noninferiority_Margin_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Difference_of_Means_for(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Difference_of_Means_for', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Standard_Deviation_of_Paired(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Standard_Deviation_of_Paired', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_include_Assurance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_include_Assurance', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_uniform_Min(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_uniform_Min', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_uniform_Max(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_uniform_Max', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_distribution_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_assurance_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_assurance_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta_By_Sigma1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta_By_Sigma1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta_By_Sigma1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta_By_Sigma1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta_By_Sigma1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta_By_Sigma1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta_By_Sigma2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta_By_Sigma2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta_By_Sigma2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta_By_Sigma2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta_By_Sigma2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta_By_Sigma2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_e_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_e_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sd_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sd_Delta', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Efficacy_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Efficacy_Boundary_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Spending_Function(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Spending_Function', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Fix', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Shape_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Shape_Parameter', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Futility_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Futility_Boundary_Family', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Shape_Parameter_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Shape_Parameter_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Boundary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Boundary', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Spend_Func', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_asym_Eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_asym_Eff_Boundary_Fam', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_upper_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Rho', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_upper_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Spend_Func', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_upper_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_upper_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Param', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_lower_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Spend_Func', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_lower_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Gamma', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_lower_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Rho', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_lower_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Param', { dynamicArgs });
  }

  /** native <select> from reference feature */
  ddl_upper_Fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Fix', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_One(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_One', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Boundary_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Boundary_Scale', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it (feature_SingleProportion/SingleMean precedent) */
  txt_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it */
  txt_boundary_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Beta_Spent', { dynamicArgs });
  }

  /** period-0 cumBetaProportion required before Calculate for ITER_14 */
  txt_boundary_0_cumBetaProportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cumBetaProportion', { dynamicArgs });
  }

  /** parametric selector for looped boundary cumBetaProportion; confirmed pattern from GADSD implementation */
  txt_boundary_cumBetaProportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_cumBetaProportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it */
  txt_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it */
  txt_boundary_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it */
  txt_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it */
  txt_boundary_3_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 4) - testdata needs it */
  txt_boundary_4_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 5) - testdata needs it */
  txt_boundary_5_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it */
  txt_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it */
  txt_boundary_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_Delta_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_Delta_By_Sigma', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it */
  txt_boundary_1_futility_Delta_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_Delta_By_Sigma', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_0_efficacy_Boundary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_Boundary', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_0_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_1_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_2_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_3_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_4_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_5_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_6_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_upper_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_0_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_1_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_2_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_3_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_4_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_5_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_6_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_lower_Alpha', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_0_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_1_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_2_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_3_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_4_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_5_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_6_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_upper_PValue', { dynamicArgs });
  }

  /** hand-added - this is the auto-generated FINAL row (not an 8th interim) once 7 real interims exist (feature_SingleMean/SingleProportion S29 precedent) */
  txt_boundary_7_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_7_upper_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_0_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_1_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_2_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_3_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_4_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_5_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_lower_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_6_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_lower_PValue', { dynamicArgs });
  }

  /** hand-added - the FINAL row's lower p-value, same note as txt_boundary_7_upper_PValue */
  txt_boundary_7_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_7_lower_PValue', { dynamicArgs });
  }

  /** button from codegen */
  btn_Calculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Calculate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** result link from codegen */
  lnk_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lnk_ResultName', { dynamicArgs });
  }

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }

  /** PARAMETRIC boundary analysisSpacingInfo; {0}=period index (loopPeriods) */
  txt_boundary_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_analysisSpacingInfo', { dynamicArgs });
  }

  /** PARAMETRIC boundary efficacyCheck; {0}=period index (loopPeriods) */
  chk_boundary_efficacyCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_efficacyCheck', { dynamicArgs });
  }

  /** PARAMETRIC boundary futilityCheck; {0}=period index (loopPeriods) */
  chk_boundary_futilityCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_futilityCheck', { dynamicArgs });
  }
}
