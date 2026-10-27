// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 77e704eb23b947be63a5fc93f54602f06430faa2a4b5ef1a541973a63a002172)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

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
  txt_mcp_Table_1_prop_Of_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_mcp_Table_1_prop_Of_Alpha', { dynamicArgs });
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
  ddl_eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_eff_Param', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_trtsel_based_On(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_trtsel_based_On', { dynamicArgs });
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

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** Optional dismissal for the Unsaved Changes modal before changing tabs */
  btn_Unsaved_Changes_Leave(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Unsaved_Changes_Leave', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_distribution_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_0_proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_0_proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_1_proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_1_proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_2_proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_2_proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_3_proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_3_proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_response_Scenario_Table_4_proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_response_Scenario_Table_4_proportion', { dynamicArgs });
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

  /** Enrollment table render wait selector */
  txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage', { dynamicArgs });
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

  /** button from codegen */
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Simulate', { dynamicArgs });
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
