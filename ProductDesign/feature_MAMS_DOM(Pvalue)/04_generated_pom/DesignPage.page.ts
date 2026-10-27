// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: c055f0b516c6a2c633c6e97834046d78994549ef154ce21bf5c31a2ffab32328)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** loading overlay after opening a design panel */
  div_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'div_Spinner', { dynamicArgs });
  }

  /** button from codegen */
  btn_Design_Compute_or_simulate_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Design_Compute_or_simulate_a', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Simulate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Simulate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Variance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Variance', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Multiple_Comparison_Procedures(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Multiple_Comparison_Procedures', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_1_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_1_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_1_prop_Of_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_1_prop_Of_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_2_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_2_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_3_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_3_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_4_alloc_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_4_alloc_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_2_prop_Of_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_2_prop_Of_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_3_prop_Of_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_3_prop_Of_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mcp_Table_4_prop_Of_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_4_prop_Of_Alpha', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Efficacy_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Efficacy_Boundary_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Spending_Function(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Spending_Function', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_eff_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Parameter', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Futility_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Futility_Boundary_Family', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_Difference_From_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_futility_Difference_From_Control', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_include_Trtmnt_Selection(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_include_Trtmnt_Selection', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Treatment_Selection_at(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Treatment_Selection_at', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Based_On(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Based_On', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_trtmnt_Selection_Table_0_rule_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_trtmnt_Selection_Table_0_rule_Name', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Type', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_id_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_trtmnt_Selection_Table_0_trtmnt_Sel_Rule_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Adaptation_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Adaptation_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Upper_Limit_on_Study_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Upper_Limit_on_Study_Duration', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Enrollment_Rate_After(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Enrollment_Rate_After', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Multiplier_for_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Multiplier_for_Enrollment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Scale', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Min_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Min_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Max_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Cp(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_min_Cp', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Max_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Delta_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_min_Delta_By_Sigma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Delta_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_Delta_By_Sigma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_SSR_Function_in_Promising_Zone(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_SSR_Function_in_Promising_Zone', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_CP_for_Re_Estimating(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_CP_for_Re_Estimating', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Multiplier(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Multiplier', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_ssr_Funtion_In_Promising_Zone(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ssr_Funtion_In_Promising_Zone', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Number_of_Steps(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Number_of_Steps', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Input_Editor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Input_Editor', { dynamicArgs });
  }

  /** textbox from codegen */
  btn_Input_Editor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Input_Editor', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_distribution_Select', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_common_Std_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_common_Std_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_0_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_0_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_1_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_1_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_2_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_2_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_3_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_3_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_4_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_4_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_0_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_0_standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_1_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_1_standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_2_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_2_standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_3_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_3_standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_4_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_4_standard_Deviation', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_common_Probabilityof_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_common_Probabilityof_Dropout', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Scenario_Table_0_dropout_Control_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Scenario_Table_0_dropout_Control_Arm', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Scenario_Table_0_dropout_Treatment_Arm1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Scenario_Table_0_dropout_Treatment_Arm1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Scenario_Table_0_dropout_Treatment_Arm2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Scenario_Table_0_dropout_Treatment_Arm2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Scenario_Table_0_dropout_Treatment_Arm3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Scenario_Table_0_dropout_Treatment_Arm3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Scenario_Table_0_dropout_Treatment_Arm4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Scenario_Table_0_dropout_Treatment_Arm4', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Period', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** PARAMETRIC boundary analysisSpacingInfo; {0}=period index (loopPeriods) */
  txt_boundary_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_analysisSpacingInfo', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
