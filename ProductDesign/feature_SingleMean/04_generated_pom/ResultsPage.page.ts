// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: bae7208926bdc7d232157db677ca6b3793f4e2766512ec0ae19cb8bbe17d5da5)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** radio button from codegen */
  radio_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Power', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_upper_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Type1Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Type1Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Response_under_Null_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Response_under_Null_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Response_under_Alternative_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Response_under_Alternative_1', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_up_Time_Month', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_of_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_of_Dropout', { dynamicArgs });
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
  txt_Min(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Min', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Max', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_distribution_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Mu1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Mu1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Mu1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Mu1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Mu1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Mu1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Mu2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Mu2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Mu2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Mu2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Mu2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Mu2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_assurance_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_assurance_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_e_Mu(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_Mu', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_Mu(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_Mu', { dynamicArgs });
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
  txt_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Parameter', { dynamicArgs });
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

  /** hand-added - never recorded (the recording's own session didn't need this branch), id confirmed via feature_DOM(PD)'s identical field */
  ddl_fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Spend_Func', { dynamicArgs });
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

  /** textbox from codegen */
  txt_shape_Param_Delta_Two(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_Two', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_One(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_One', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_asym_Eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_asym_Eff_Boundary_Fam', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_upper_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Spend_Func', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_upper_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_upper_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_upper_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_lower_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Spend_Func', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_lower_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_upper_Fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Fix', { dynamicArgs });
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

  /** textbox from codegen */
  txt_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Beta_Spent', { dynamicArgs });
  }

  /** hand-added - never recorded (recording's own session used a different boundary family), id confirmed via feature_DOM(PD)'s identical field */
  txt_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 1) */
  txt_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added - never recorded, id confirmed via feature_DOM(PD)'s identical field */
  txt_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 1) */
  txt_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** hand-added - never recorded, id confirmed via feature_DOM(PD)'s identical field */
  txt_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 1) */
  txt_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 2) */
  txt_boundary_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_CP', { dynamicArgs });
  }

  /** hand-added - never recorded anywhere (not even in feature_DOM(PD)), id pattern INFERRED from the same boundary.N.field convention - SCREENSHOT-VERIFY on first live run */
  txt_boundary_0_futility_Mu_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_Mu_By_Sigma', { dynamicArgs });
  }

  /** hand-added - design enrollment is single-period, confirmed via feature_DOP(PD)'s identical scalar fix */
  txt_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Beta_Spent', { dynamicArgs });
  }

  /** hand-added (period 3) - the recording only ever exercised periods 0-2 for cumBetaSpent, same input[name=] convention as its siblings - confirmed live (TC_24 ITER_04) */
  txt_boundary_3_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_upper_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_upper_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_upper_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_upper_PValue', { dynamicArgs });
  }

  /** hand-added (period 4) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_4_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_upper_PValue', { dynamicArgs });
  }

  /** hand-added (period 5) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_5_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_upper_PValue', { dynamicArgs });
  }

  /** hand-added (period 6) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_6_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_upper_PValue', { dynamicArgs });
  }

  /** hand-added - this is the auto-generated FINAL row's upper p-value (not an 8th interim) when exactly 7 real interims exist, confirmed via live dumpSubtree DOM dump (TC_24 ITER_11) - its index shifts with interim count, so this id is only correct for iterations with exactly 7 real interims */
  txt_boundary_7_upper_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_7_upper_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_lower_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_lower_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_lower_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_lower_PValue', { dynamicArgs });
  }

  /** hand-added (period 4) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_4_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_4_lower_PValue', { dynamicArgs });
  }

  /** hand-added (period 5) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_5_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_5_lower_PValue', { dynamicArgs });
  }

  /** hand-added (period 6) - TC_24 ITER_11 needs 8 periods, same id convention as its siblings */
  txt_boundary_6_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_6_lower_PValue', { dynamicArgs });
  }

  /** hand-added - the FINAL row's lower p-value, same note as txt_boundary_7_upper_PValue */
  txt_boundary_7_lower_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_7_lower_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_upper_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_upper_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_upper_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_upper_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_lower_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_lower_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_lower_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_lower_Alpha', { dynamicArgs });
  }

  /** button from codegen */
  btn_Calculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Calculate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Include', { dynamicArgs });
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

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
