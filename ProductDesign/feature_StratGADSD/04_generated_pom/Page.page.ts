// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 068a396c6d5e3bd87c4dfa89b1b45b96a016f02ee6ecb2747d1e255a8aa10eb7)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Input Set Name field (same #inputId element as txt_ResultName, but filled right after clicking Simulate to name the new Input Set - distinct occurrence from the post-Save&Simulate Result Name fill) */
  txt_InputSetName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_InputSetName', { dynamicArgs });
  }

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

  /** Sim Response tab (leftPanel.response) - click to mount it early before header/boundary edits, matching the proven feature_DOM(PD)/feature_ROP(PD) fix pattern */
  txt_left_Panel_response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sample_Size', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Fix_at_Each_Analysis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Fix_at_Each_Analysis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Study_Duration_Day(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Study_Duration_Day', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fix_At_Each_Analysis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_fix_At_Each_Analysis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_number_Of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_number_Of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_harrington_Flem_P(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_harrington_Flem_P', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_harrington_Flem_Q(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_harrington_Flem_Q', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_ZUpper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_ZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_ZLower', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_link_Model_Params(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_link_Model_Params', { dynamicArgs });
  }

  /** confirmation prompt text (fixed from a wrong #primaryButton binding, which collided with the separate btn_primary_Button confirm click that comes after it) - matches recording's getByText('Unlinking the model').click() */
  lnk_Unlinking_the_model(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'lnk_Unlinking_the_model', { dynamicArgs });
  }

  /** confirmation prompt text (fixed from a wrong #primaryButton binding, which collided with the separate btn_primary_Button confirm click that comes after it) - matches recording's getByText('Linking the model parameters').click() */
  lnk_Linking_the_model_parameters(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'lnk_Linking_the_model_parameters', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Baseline_Hazard_Rate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Baseline_Hazard_Rate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Expand_All(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Expand_All', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_0_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_0_5', { dynamicArgs });
  }

  /** textbox from codegen */
  btn_Input_Editor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Input_Editor', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_1', { dynamicArgs });
  }

  /** button from codegen */
  btn_Apply(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Apply', { dynamicArgs });
  }

  /** button from codegen */
  btn_primary_Button(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_primary_Button', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Number_of_Pieces(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Number_of_Pieces', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Apply_Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Apply_Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_common_Hr_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_common_Hr_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_stratum_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_stratum_Select', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Piece(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Piece', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_bulk_HRControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_bulk_HRControl', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_bulk_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_bulk_HR', { dynamicArgs });
  }

  /** button from codegen */
  btn_Bulk_Apply(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Bulk_Apply', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_starting_At_Time1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_starting_At_Time1', { dynamicArgs });
  }

  /** piece boundary time field, same pattern as txt_starting_At_Time1 */
  txt_starting_At_Time2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_starting_At_Time2', { dynamicArgs });
  }

  /** piece boundary time field, same pattern as txt_starting_At_Time1 */
  txt_starting_At_Time3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_starting_At_Time3', { dynamicArgs });
  }

  /** piece boundary time field, same pattern as txt_starting_At_Time1 */
  txt_starting_At_Time4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_starting_At_Time4', { dynamicArgs });
  }

  /** piece boundary time field, same pattern as txt_starting_At_Time1 */
  txt_starting_At_Time5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_starting_At_Time5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ag_row_odd_ag_row_no_focus_ag_row_ag_row_level_0_ag_row_position_absolute_ag_row_last_ag_row_not_inline_editing_ag_row_hover_ag_cell_ag_cell_not_inline_editing_ag_cell_normal_height_rag_red(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_ag_row_odd_ag_row_no_focus_ag_row_ag_row_level_0_ag_row_position_absolute_ag_row_last_ag_row_not_inline_editing_ag_row_hover_ag_cell_ag_cell_not_inline_editing_ag_cell_normal_height_rag_red', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Input_Editor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Input_Editor', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_confirmation_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_confirmation_primary', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_h_RDistribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_h_RDistribution_Select', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_follow_Up_Time', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Dropout_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Dropout_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_dropout_Distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_dropout_Distribution_Select', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Add_Period', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Follow_up_Time_Day_Variable_Dropouts_Piecewise_Dropout_Information_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Follow_up_Time_Day_Variable_Dropouts_Piecewise_Dropout_Information_Dropout', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Enrollment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Accrual_Duration_Day(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Accrual_Duration_Day', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_accrual_Info_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_accrual_Info_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_accrual_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_accrual_Duration', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_0_by_Time', { dynamicArgs });
  }

  /** missing literal (period-0) selector - the parametric txt_enrollmentTable_avgSubjectsEnrolled with {0} already existed but StepID=690 uses the literal ObjectName, which was never defined */
  txt_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_0_accrual_Percentage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_0_accrual_Percentage', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_accrual_Percentage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_1_accrual_Percentage', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable byTime; {0}=period index (loopPeriods) - needed for ITER_02/05/08-style byTime-mode iterations */
  txt_enrollmentTable_byTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_byTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable accrualPercentage; {0}=period index (loopPeriods) - needed for ITER_02/05/08-style byTime-mode iterations */
  txt_enrollmentTable_accrualPercentage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_accrualPercentage', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_link_Marginal_Allocation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_link_Marginal_Allocation', { dynamicArgs });
  }

  /** confirmation prompt text (fixed from a wrong #primaryButton binding, same bug class as lnk_Unlinking_the_model) - matches recording's getByText('Unlinking the marginal').click() */
  lnk_Unlinking_the_marginal(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'lnk_Unlinking_the_marginal', { dynamicArgs });
  }

  /** confirmation prompt text (fixed from a wrong #primaryButton binding, same bug class as lnk_Linking_the_model_parameters) - matches recording's getByText('Linking the marginal').click() */
  lnk_Linking_the_marginal(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'lnk_Linking_the_marginal', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_25(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_25', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_40(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_40', { dynamicArgs });
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

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutStartingAtTime; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutStartingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_dropoutStartingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutByTime; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutByTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_dropoutByTime', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable probOfdropoutControl; {0}=period index (loopPeriods) */
  txt_dropoutTable_probOfdropoutControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_probOfdropoutControl', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable probOfdropoutTreatment; {0}=period index (loopPeriods) */
  txt_dropoutTable_probOfdropoutTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_probOfdropoutTreatment', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutHazardRateControl; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutHazardRateControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_dropoutHazardRateControl', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutHazardRateTreatment; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutHazardRateTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropoutTable_dropoutHazardRateTreatment', { dynamicArgs });
  }

  /** Treatment's own Hazard Ratio cell (row-index=1; row-index=0 is the non-editable Control/Baseline row) - confirmed live via DevTools col-id/row-index evidence */
  sel_hR_treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_treatment', { dynamicArgs });
  }

  /** Factor 1 Level 2 Hazard Ratio cell (row-index=1; row-index=0 is F1L1/Baseline) - confirmed live via DevTools col-id/row-index evidence */
  sel_hR_f1_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f1_level2', { dynamicArgs });
  }

  /** Factor 1 Level 3 Hazard Ratio cell - confirmed live via DevTools col-id/row-index evidence */
  sel_hR_f1_level3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f1_level3', { dynamicArgs });
  }

  /** Factor 1 Level 4 Hazard Ratio cell - confirmed live via DevTools col-id/row-index evidence */
  sel_hR_f1_level4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f1_level4', { dynamicArgs });
  }

  /** Factor 1 Level 5 Hazard Ratio cell - row-index pattern extrapolated from confirmed Levels 2-4; not itself screenshot-confirmed */
  sel_hR_f1_level5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f1_level5', { dynamicArgs });
  }

  /** Factor 2 Level 2 Hazard Ratio cell (row-index=1; row-index=0 is F2L1/Baseline) - confirmed live via DevTools col-id/row-index evidence */
  sel_hR_f2_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f2_level2', { dynamicArgs });
  }

  /** Factor 2 Level 3 Hazard Ratio cell - row-index pattern extrapolated from confirmed Level 2; not itself screenshot-confirmed */
  sel_hR_f2_level3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f2_level3', { dynamicArgs });
  }

  /** Factor 3 Level 2 Hazard Ratio cell - UNCONFIRMED: childGrid3 container id is inferred by pattern from childGrid0/1/2, never seen live (Factor 3 never appeared in the demo scenario screenshotted this session). Screenshot-verify on ITER_01's first run. */
  sel_hR_f3_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_hR_f3_level2', { dynamicArgs });
  }

  /** Marginal Allocation Factor 1 Level 1 weight cell - reuses the Response page's childGrid pattern (Factor 1=childGrid1); Level 1 IS editable here (unlike the Hazard Ratio grid's Baseline row) - CONFIRMED live via DevTools - Factor 1 container is childGrid0 on this page (Marginal Allocation has only 3 grids, no Treatment, so numbering is one lower than the Response page */
  sel_wA_f1_level1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f1_level1', { dynamicArgs });
  }

  /** Marginal Allocation Factor 1 Level 2 weight cell - CONFIRMED live via DevTools */
  sel_wA_f1_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f1_level2', { dynamicArgs });
  }

  /** Marginal Allocation Factor 1 Level 3 weight cell - CONFIRMED live via DevTools */
  sel_wA_f1_level3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f1_level3', { dynamicArgs });
  }

  /** Marginal Allocation Factor 1 Level 4 weight cell - CONFIRMED live via DevTools */
  sel_wA_f1_level4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f1_level4', { dynamicArgs });
  }

  /** Marginal Allocation Factor 1 Level 5 weight cell - CONFIRMED live via DevTools */
  sel_wA_f1_level5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f1_level5', { dynamicArgs });
  }

  /** Marginal Allocation Factor 2 Level 1 weight cell - CONFIRMED live via DevTools */
  sel_wA_f2_level1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f2_level1', { dynamicArgs });
  }

  /** Marginal Allocation Factor 2 Level 2 weight cell - CONFIRMED live via DevTools */
  sel_wA_f2_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f2_level2', { dynamicArgs });
  }

  /** Marginal Allocation Factor 2 Level 3 weight cell - CONFIRMED live via DevTools - row-index=2 exists here (Factor 2 genuinely has 3 levels) */
  sel_wA_f2_level3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f2_level3', { dynamicArgs });
  }

  /** Marginal Allocation Factor 3 Level 1 weight cell - CONFIRMED live via DevTools */
  sel_wA_f3_level1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f3_level1', { dynamicArgs });
  }

  /** Marginal Allocation Factor 3 Level 2 weight cell - CONFIRMED live via DevTools */
  sel_wA_f3_level2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_wA_f3_level2', { dynamicArgs });
  }

  /** Recalculate button - appears after editing table data (boundarySim/Hazard Ratio/dropout/enrollment/Marginal Allocation) and must be pressed when available before proceeding; matches feature_GADAR(PD)'s btn_Recalculate convention */
  btn_Recalculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Recalculate', { dynamicArgs });
  }

  /** Unsaved Changes modal's Leave button (title "Unsaved Changes", body "Are you sure you want to leave without saving your..."). Can appear immediately after mounting the Response tab, before any explicit edit (observed live for ITER_06/Logrank). Clicked with Optional=TRUE so it no-ops for iterations where the modal never appears - see core/keywords/input.ts's Optional-click-on-absent-target no-op behavior. */
  btn_cancelConfirm_Leave(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_cancelConfirm_Leave', { dynamicArgs });
  }

  /** CONFIRMED via Chrome DevTools "Copy selector" of the expanded-state equivalent (span.ag-group-expanded) - the actual interactive icon span, not the outer .ag-cell-expandable wrapper. Scoped to #multiPieceStratTable (the Strata/Piece grid's stable container id) to resolve cross-grid ambiguity. */
  btn_Expand_Piecewise_Group(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Expand_Piecewise_Group', { dynamicArgs });
  }

  /** CONFIRMED live via DevTools - pencil/edit icon button next to the expanded Strata row's Starting at Time (Week) column header; opens the 'Bulk Edit Starting at Times' modal (applies to all strata) */
  btn_startingAtTime_edit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_startingAtTime_edit', { dynamicArgs });
  }

  /** CONFIRMED via Playwright's own strict-mode-violation error, which printed the exact element: col-id="startingAtTime" (aria-colindex=2). Modal container is #modalGrid (opened directly by clicking #startingAtTime1). UI Piece 1 is a fixed/disabled row at time=0 (nth-child(1)); this is UI Piece 2, mapped from testdata startingAtTime1. */
  sel_bulkEdit_piece1_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece1_time', { dynamicArgs });
  }

  /** CONFIRMED col-id=startingAtTime - UI Piece 3, mapped from testdata startingAtTime2 */
  sel_bulkEdit_piece2_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece2_time', { dynamicArgs });
  }

  /** UI Piece 4, mapped from testdata startingAtTime3 (extrapolated row position, col-id confirmed) */
  sel_bulkEdit_piece3_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece3_time', { dynamicArgs });
  }

  /** UI Piece 5, mapped from testdata startingAtTime4 (extrapolated row position, col-id confirmed) */
  sel_bulkEdit_piece4_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece4_time', { dynamicArgs });
  }

  /** UI Piece 6, mapped from testdata startingAtTime5 (extrapolated row position, col-id confirmed) - DISPROVEN live for hRNumOfPieces=5 (only 5 total rows exist, no UI Piece 6); kept only for hRNumOfPieces>=6 iterations if any ever need it */
  sel_bulkEdit_piece5_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece5_time', { dynamicArgs });
  }

  /** PARAMETRIC Bulk Edit modal Starting-At-Time cell; {0}=1-based nth-child position (UI Piece N sits at nth-child(N), UI Piece 1 is the fixed baseline=0). CONFIRMED via live dumpGridDiagnostic (ITER_05): total modal rows = hRNumOfPieces, so only hRNumOfPieces-1 editable rows exist - used by fillBulkEditStartingTimes to compact-fill whichever startingAtTime1-5 values are non-N/A into the available rows in order, since a rigid per-field-to-per-row mapping breaks when an early field (e.g. startingAtTime1) is N/A but a later one isn't */
  sel_bulkEdit_piece_time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_bulkEdit_piece_time', { dynamicArgs });
  }

  /** FIXED via live DOM diagnostic (dumpGridDiagnostic): row-index is on the ROW div, col-id is on a separate nested CELL div - NOT the same element, so this needs a descendant combinator (space) not a compound attribute selector. {0}=stratum row index */
  sel_strata_byTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_strata_byTime', { dynamicArgs });
  }

  /** Same descendant-combinator fix as sel_strata_byTime. The PRIMARY editable value cell (shows Cumulative % Survival / Median Survival Time / Hazard Rate depending on hRInputMethod, but col-id stays "control" regardless); {0}=stratum row index */
  sel_strata_control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_strata_control', { dynamicArgs });
  }

  /** Same descendant-combinator fix as sel_strata_byTime. Hazard Ratio column, present in all 3 Input Methods; {0}=stratum row index */
  sel_strata_hazardRatio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_strata_hazardRatio', { dynamicArgs });
  }

  /** DIAGNOSTIC - bare container only, to test whether the container itself is found before suspecting the nested row-index/col-id selector */
  diag_singlePieceStratTable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'diag_singlePieceStratTable', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim analysisSpacingInfo; {0}=period index (loopPeriods) */
  txt_boundarySim_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_analysisSpacingInfo', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim analysisTime; {0}=period index. UNVERIFIED attribute pattern (guessed id=, matching most other boundarySim fields) - screenshot-verify */
  txt_boundarySim_analysisTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_analysisTime', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim cumAlphaSpent; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_cumAlphaSpent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_cumAlphaSpent', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim efficacyZ; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_efficacyZ(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_efficacyZ', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityHR; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityHR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityHR', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityZ; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityZ(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityZ', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim efficacyPValue; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_efficacyPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_efficacyPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityPValue; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim cumAlphaSpentUpper; {0}=period index (loopPeriods) */
  txt_boundarySim_cumAlphaSpentUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_cumAlphaSpentUpper', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim cumAlphaSpentLower; {0}=period index (loopPeriods) */
  txt_boundarySim_cumAlphaSpentLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_cumAlphaSpentLower', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim efficacyZUpper; {0}=period index (loopPeriods) */
  txt_boundarySim_efficacyZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_efficacyZUpper', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim efficacyZLower; {0}=period index (loopPeriods) */
  txt_boundarySim_efficacyZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_efficacyZLower', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityZUpper; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityZUpper', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityZLower; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityZLower', { dynamicArgs });
  }

  /** PARAMETRIC boundarySim futilityCP; {0}=period index. UNVERIFIED - screenshot-verify */
  txt_boundarySim_futilityCP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundarySim_futilityCP', { dynamicArgs });
  }

  /** PARAMETRIC Weights panel (Enrollment page, shown when linkMarginalAllocation=uncheck) per-stratum weight cell; {0}=row-index=StratumIndex. CONFIRMED via live DevTools (user-provided): row-index/col-id are on DIFFERENT elements (descendant combinator needed), same structural pattern as #singlePieceStratTable */
  sel_weights_cell(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'sel_weights_cell', { dynamicArgs });
  }

  /** textbox - copied from proven feature_DOM(PD) sim pattern, found via check-testdata-coverage.ts gap report */
  txt_critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_critical_Point', { dynamicArgs });
  }

  /** the #marginNI id guess AND the label-type selector both failed ("field not found" - fill doesn't get the label->sibling fallback that click/select get, and getByLabel needs a real <label for> association this app apparently doesn't use here); using an XPath that finds the label TEXT then the next input in document order instead */
  txt_margin_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_margin_NI', { dynamicArgs });
  }

  /** Super Superiority margin (hypothesis-specific; renders only for Super Superiority) - matches feature_GADAR(PD)'s txt_Margin_SS (#margin_SS, underscore matches the testdata column literally, not camelCase). Original camelCase guess (#marginSS) FAILED live for ITER_08 - fixed by mirroring the sibling. */
  txt_margin_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_margin_SS', { dynamicArgs });
  }
}
