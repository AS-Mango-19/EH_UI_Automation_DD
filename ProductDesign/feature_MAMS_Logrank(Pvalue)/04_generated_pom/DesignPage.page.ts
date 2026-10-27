// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: c665650c1f3297e735e0d37fd24362224385e4a4c935213b7291cc38ef8b6d78)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

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

  /** recorded label-only Randomization Method value */
  obj_Randomization_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Randomization_Method', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_distribution_Select', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Number_of_Pieces(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Number_of_Pieces', { dynamicArgs });
  }

  /** expand the Control Arm multi-piece input-method row */
  btn_multiPieceInputMethodTable_Expand(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_multiPieceInputMethodTable_Expand', { dynamicArgs });
  }

  /** bulk-edit time cell using authored row-id and recorded column index 2 */
  cell_multiPiece_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'cell_multiPiece_Time', { dynamicArgs });
  }

  /** bulk-edit control cell by stable column id - modal renders it at aria-colindex 2 */
  cell_multiPiece_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'cell_multiPiece_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Input_Editor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Input_Editor', { dynamicArgs });
  }

  /** apply bulk-edited multi-piece values */
  btn_multiPiece_Apply(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_multiPiece_Apply', { dynamicArgs });
  }

  /** open cumulative-survival by-time bulk editor */
  cell_multiPiece_OpenByTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'cell_multiPiece_OpenByTime', { dynamicArgs });
  }

  /** open hazard-rate starting-time bulk editor */
  cell_multiPiece_OpenStartingTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'cell_multiPiece_OpenStartingTime', { dynamicArgs });
  }

  /** open control bulk-edit modal */
  cell_multiPiece_OpenControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'cell_multiPiece_OpenControl', { dynamicArgs });
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

  /** Enrollment table render wait selector */
  txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Number_of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Number_of_Events', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_p(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_p', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_q(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_q', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_follow_Up_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Parameter', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_futility_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_futility_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Based_on(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Based_on', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ag_cell_focus_ag_cell_wrapper_ag_group_contracted(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ag_cell_focus_ag_cell_wrapper_ag_group_contracted', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_starting_At_Time0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_starting_At_Time0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ag_row_odd_ag_row_no_focus_ag_row_ag_row_level_0_ag_row_position_absolute_ag_row_not_inline_editing_ag_row_hover_ag_cell_ag_cell_not_inline_editing_ag_cell_normal_height_rag_red(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ag_row_odd_ag_row_no_focus_ag_row_ag_row_level_0_ag_row_position_absolute_ag_row_not_inline_editing_ag_row_hover_ag_cell_ag_cell_not_inline_editing_ag_cell_normal_height_rag_red', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_confirmation_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_confirmation_primary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_control_MAMS0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_control_MAMS0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_0_034657(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_0_034657', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_0_034657_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_0_034657_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_1_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_2_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_3_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_3_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_4_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_4_hazard_Ratio', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_Method_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Control_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_0_dropout_Control_Arm', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Treatment_Arm1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_0_dropout_Treatment_Arm1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Treatment_Arm2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_0_dropout_Treatment_Arm2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Treatment_Arm3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_0_dropout_Treatment_Arm3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Treatment_Arm4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_0_dropout_Treatment_Arm4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Control_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_1_dropout_Control_Arm', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Treatment_Arm1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_1_dropout_Treatment_Arm1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Treatment_Arm2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_1_dropout_Treatment_Arm2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Treatment_Arm3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_1_dropout_Treatment_Arm3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Treatment_Arm4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_1_dropout_Treatment_Arm4', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Piece(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Piece', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_Control_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_2_dropout_Control_Arm', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_Treatment_Arm1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_2_dropout_Treatment_Arm1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_Treatment_Arm2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_2_dropout_Treatment_Arm2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_Treatment_Arm3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_2_dropout_Treatment_Arm3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_Treatment_Arm4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Table_2_dropout_Treatment_Arm4', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_drop_Out_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_drop_Out_Distribution', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutByTime; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutByTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutByTime', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutControlArm; {0}=period index */
  txt_dropoutTable_dropoutControlArm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutControlArm', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutTreatmentArm1; {0}=period index */
  txt_dropoutTable_dropoutTreatmentArm1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutTreatmentArm1', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutTreatmentArm2; {0}=period index */
  txt_dropoutTable_dropoutTreatmentArm2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutTreatmentArm2', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutTreatmentArm3; {0}=period index */
  txt_dropoutTable_dropoutTreatmentArm3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutTreatmentArm3', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutTreatmentArm4; {0}=period index */
  txt_dropoutTable_dropoutTreatmentArm4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropoutTable_dropoutTreatmentArm4', { dynamicArgs });
  }
}
