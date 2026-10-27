// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 49c442070b817399d79f0ebe68c4303d0efb6a8a8b7c8f99a76e72a3976c95be)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Allocation ratio input */
  txt_Allocation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation', { dynamicArgs });
  }

  /** Target power input */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Power', { dynamicArgs });
  }

  /** 1-Sided / 2-Sided dropdown */
  ddl_TestType(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_TestType', { dynamicArgs });
  }

  /** Type-1 error input */
  txt_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type1Error', { dynamicArgs });
  }

  /** Mean under control arm */
  txt_MeanControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_MeanControl', { dynamicArgs });
  }

  /** Mean under treatment arm */
  txt_MeanTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_MeanTreatment', { dynamicArgs });
  }

  /** Common standard deviation */
  txt_StdDev(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_StdDev', { dynamicArgs });
  }

  /** Compute / simulate button */
  btn_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Compute', { dynamicArgs });
  }

  /** Status polled during simulation */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'lbl_RunStatus', { dynamicArgs });
  }

  /** button from codegen */
  btn_Design_Compute_or_simulate_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Design_Compute_or_simulate_a', { dynamicArgs });
  }

  /** Enrollment table render wait selector */
  txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage', { dynamicArgs });
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
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Multiple_Comparison_Procedure(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Multiple_Comparison_Procedure', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Planned_End_of_Trial(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Planned_End_of_Trial', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Testing_Order(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Testing_Order', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Hypothesis', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Target_Number_of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Number_of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error_Allocation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type_1_Error_Allocation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Noninferiority_Margin_ln_HR0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Noninferiority_Margin_ln_HR0', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_ep1Variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_ep1Variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_ep1Follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_ep1Follow_Up_Time', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Variance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Variance', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Noninferiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Noninferiority_Margin_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Sample_Size_Final(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Sample_Size_Final', { dynamicArgs });
  }

  /** EP2 hypothesis select */
  ddl_ep2Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Hypothesis', { dynamicArgs });
  }

  /** EP2 test statistic select */
  ddl_ep2Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Test_Statistic', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Efficacy_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Efficacy_Boundary_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Spending_Function(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Spending_Function', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Eff_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Futility_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Futility_Boundary_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Threshold(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Threshold', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Threshold_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Threshold_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Eff_Param_Gamma', { dynamicArgs });
  }

  /** EP2 efficacy boundary family select */
  ddl_ep2Eff_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Boundary_Family', { dynamicArgs });
  }

  /** EP2 efficacy spending function select */
  ddl_ep2Eff_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Spend_Func', { dynamicArgs });
  }

  /** EP2 efficacy parameter select */
  ddl_ep2Eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Param', { dynamicArgs });
  }

  /** EP2 futility boundary family select */
  ddl_ep2Fut_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Boundary_Family', { dynamicArgs });
  }

  /** EP2 futility spending function select */
  ddl_ep2Fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Spend_Func', { dynamicArgs });
  }

  /** EP2 futility parameter select */
  ddl_ep2Fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_ep2Threshold_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Threshold_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Threshold_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Threshold_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Synchronize_Interims(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Synchronize_Interims', { dynamicArgs });
  }

  /** EP2-primary checkbox: keep analysis spacing info for EP1 same as EP2 */
  chk_keep_Analysis_Info_EP1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info_EP1', { dynamicArgs });
  }

  /** EP1-primary checkbox: keep analysis spacing info for EP2 same as EP1 - DIFFERENT DOM id than chk_keep_Analysis_Info_EP1, same pattern proven on feature_Dual_LogrankLogrank TC_37 (AI_IMPORT_AGENT.md section 9.2 / IMPORT_LESSONS.md rule 18) */
  chk_keep_Analysis_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim_to_Both(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim_to_Both', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim_to_EP2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim_to_EP2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep1Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep1Analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_ep1Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep1Analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_ep1Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep1Analysis_Spacing_Info', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep1Efficacy_Check', { dynamicArgs });
  }

  /** EP1 period 1 efficacy checkbox */
  chk_boundary_1_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Efficacy_Check', { dynamicArgs });
  }

  /** EP1 period 0 futility checkbox */
  chk_boundary_0_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep1Futility_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** EP1 period 1 threshold textbox */
  txt_boundary_1_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_4_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_4_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 analysis spacing period 0 */
  txt_boundary_0_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 analysis spacing period 1 */
  txt_boundary_1_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 analysis spacing period 2 */
  txt_boundary_2_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 analysis spacing period 3 */
  txt_boundary_3_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep2Efficacy_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 0 */
  chk_boundary_1_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep2Efficacy_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 0 */
  chk_boundary_2_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Efficacy_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 0 */
  chk_boundary_3_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Efficacy_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 1 */
  chk_boundary_0_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep2Futility_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep2Futility_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 1 */
  chk_boundary_2_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Futility_Check', { dynamicArgs });
  }

  /** checkbox mirrored from period 1 */
  chk_boundary_3_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox mirrored from period 0 */
  txt_boundary_1_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_4_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_4_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Endpoint_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Endpoint_Rules', { dynamicArgs });
  }

  /** dropdown from codegen */
  ddl_react_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_react_select_input_container', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_endpoint_Sub_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_endpoint_Sub_Rules', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Correlation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Correlation', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Hazard_Ratio_Modifier(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Hazard_Ratio_Modifier', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Hazard_Ratio_Modifier_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Hazard_Ratio_Modifier_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_0_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_0_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_0_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_0_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_1_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_1_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_1_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_0_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** EP1 Add Piece scoped to the card containing EP1 input-method fields */
  btn_Add_Piece(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Piece', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_2_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_2_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep1Input_Method_Table_2_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode, proven pattern from feature_Dual_LogrankLogrank TC_37) */
  txt_ep1Input_Method_Table_1_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1By_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode) */
  txt_ep1Input_Method_Table_1_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode) */
  txt_ep1Input_Method_Table_2_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1By_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode) */
  txt_ep1Input_Method_Table_2_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode, ITER_04) */
  txt_ep1Input_Method_Table_3_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Starting_At_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode) */
  txt_ep1Input_Method_Table_3_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness) */
  txt_ep1Input_Method_Table_3_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode, ITER_03) */
  txt_ep1Input_Method_Table_3_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1By_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode) */
  txt_ep1Input_Method_Table_3_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode) */
  txt_ep1Input_Method_Table_4_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Starting_At_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode) */
  txt_ep1Input_Method_Table_4_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness) */
  txt_ep1Input_Method_Table_4_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode, ITER_03) */
  txt_ep1Input_Method_Table_4_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1By_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Cumulative % Survival mode) */
  txt_ep1Input_Method_Table_4_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode, ITER_04) */
  txt_ep1Input_Method_Table_5_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Starting_At_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode) */
  txt_ep1Input_Method_Table_5_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode, ITER_04) */
  txt_ep1Input_Method_Table_6_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Starting_At_Time', { dynamicArgs });
  }

  /** boundary cell (table-completeness - Hazard Rate mode) */
  txt_ep1Input_Method_Table_6_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Control_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_By_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_By_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Treatment', { dynamicArgs });
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

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
