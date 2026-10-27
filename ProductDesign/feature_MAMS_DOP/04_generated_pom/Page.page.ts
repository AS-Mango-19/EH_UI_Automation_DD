// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: c69fa8e494c1fc57dfe10c89946f8e32a88b6424c737e6bd5b57b1c3a789a930)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_left_Panel_designs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_designs', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_1_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_mcp_Table_1_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_2_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_mcp_Table_2_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_3_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_mcp_Table_3_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_4_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_mcp_Table_4_alloc_Ratio', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Efficacy_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Efficacy_Boundary_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_eff_Boundary_Fam', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Spending_Function(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Spending_Function', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_eff_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_eff_Param', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Terminate_trial_if_at_least(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'radio_Terminate_trial_if_at_least', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Continue_trial_with(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'radio_Continue_trial_with', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Futility_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Futility_Boundary_Family', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_fut_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_fut_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_fut_Param', { dynamicArgs });
  }

  /** VERIFY selector - never recorded in either flow; inferred by mirroring the confirmed #effSpendFunc id pattern. Screenshot-verify on first live run. */
  ddl_Futility_Spending_Function(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Futility_Spending_Function', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Do_not_drop_treatment_arms(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'radio_Do_not_drop_treatment_arms', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Drop_any_treatment_arm_that(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'radio_Drop_any_treatment_arm_that', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_Sim_0_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_boundary_Sim_0_efficacy_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_Sim_0_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_boundary_Sim_0_futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Delta', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim analysisSpacingInfo; {0}=period index (loopPeriods) - same attribute pattern as the confirmed-live boundarySim.0 entries above */
  txt_boundarySim_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_analysisSpacingInfo', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim efficacyCheck; {0}=period index (loopPeriods) */
  chk_boundarySim_efficacyCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_boundarySim_efficacyCheck', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityCheck; {0}=period index (loopPeriods) */
  chk_boundarySim_futilityCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_boundarySim_futilityCheck', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim cumAlphaSpent; {0}=period index (loopPeriods) */
  txt_boundarySim_cumAlphaSpent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_cumAlphaSpent', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityDelta; {0}=period index (loopPeriods) */
  txt_boundarySim_futilityDelta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityDelta', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityPValue; {0}=period index (loopPeriods) */
  txt_boundarySim_futilityPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityPValue', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_include_Trtmnt_Selection(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_include_Trtmnt_Selection', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Treatment_Selection_at(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Treatment_Selection_at', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Treatment_Effect_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Treatment_Effect_Scale', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_trtmnt_Selection_Table_0_rule_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_trtmnt_Selection_Table_0_rule_Name', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Type', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Input', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Table_0_res_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_arm_Table_0_res_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Table_1_res_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_arm_Table_1_res_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Table_2_res_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_arm_Table_2_res_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Table_3_res_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_arm_Table_3_res_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Table_4_res_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_arm_Table_4_res_Proportion', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Save', { dynamicArgs });
  }
}
