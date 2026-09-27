// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: f7c4ee9d0b482b40d52747ec432ac2db98db5bfdd5bc14cf7c93248c1b8a2554)
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
  ddl_Variance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Variance', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error_Allocation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type_1_Error_Allocation', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** EP2 hypothesis select */
  ddl_ep2Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Hypothesis', { dynamicArgs });
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
  txt_Noninferiority_Margin_ln_HR0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Noninferiority_Margin_ln_HR0', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_ep2Variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_ep2Variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_ep2Follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_ep2Follow_Up_Time', { dynamicArgs });
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
  txt_input_name_ep2Eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_ep2Eff_Param_Gamma', { dynamicArgs });
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

  /** button from codegen */
  btn_Add_Interim_to_Both(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim_to_Both', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim_to_EP2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim_to_EP2', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim_to_EP1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim_to_EP1', { dynamicArgs });
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

  /** checkbox from codegen */
  chk_boundary_1_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_4_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_4_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep2Efficacy_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep2Futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep2Threshold_Per_Interim', { dynamicArgs });
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

  /** EP2-primary checkbox: keep analysis spacing info for EP1 same as EP2 */
  chk_keep_Analysis_Info_EP1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info_EP1', { dynamicArgs });
  }

  /** EP1-primary checkbox: keep analysis spacing info for EP2 same as EP1 */
  chk_keep_Analysis_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info', { dynamicArgs });
  }

  /** EP2 period 0 analysis spacing textbox */
  txt_boundary_0_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 period 1 analysis spacing textbox */
  txt_boundary_1_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 period 2 analysis spacing textbox */
  txt_boundary_2_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP2 period 3 analysis spacing textbox */
  txt_boundary_3_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** EP1 period 1 efficacy checkbox */
  chk_boundary_1_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Efficacy_Check', { dynamicArgs });
  }

  /** EP1 period 2 efficacy checkbox */
  chk_boundary_2_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep1Efficacy_Check', { dynamicArgs });
  }

  /** EP1 period 0 futility checkbox */
  chk_boundary_0_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep1Futility_Check', { dynamicArgs });
  }

  /** EP1 period 2 futility checkbox */
  chk_boundary_2_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep1Futility_Check', { dynamicArgs });
  }

  /** EP1 period 1 threshold textbox */
  txt_boundary_1_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** EP2 period 1 efficacy checkbox */
  chk_boundary_1_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep2Efficacy_Check', { dynamicArgs });
  }

  /** EP2 period 2 efficacy checkbox */
  chk_boundary_2_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Efficacy_Check', { dynamicArgs });
  }

  /** EP2 period 3 efficacy checkbox */
  chk_boundary_3_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Efficacy_Check', { dynamicArgs });
  }

  /** EP2 period 0 futility checkbox */
  chk_boundary_0_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep2Futility_Check', { dynamicArgs });
  }

  /** EP2 period 2 futility checkbox */
  chk_boundary_2_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Futility_Check', { dynamicArgs });
  }

  /** EP2 period 3 futility checkbox */
  chk_boundary_3_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Futility_Check', { dynamicArgs });
  }

  /** EP2 period 1 threshold textbox */
  txt_boundary_1_ep2Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep2Threshold_Per_Interim', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Endpoint_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Endpoint_Rules', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_endpoint_Sub_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_endpoint_Sub_Rules', { dynamicArgs });
  }

  /** Correlation dropdown */
  ddl_Correlation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Correlation', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_react_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_react_select_input_container', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Control_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Proportion', { dynamicArgs });
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
  txt_ep2Hazard_Ratio_Modifier_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Hazard_Ratio_Modifier_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_0_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_0_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_0_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_0_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_0_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_1_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_1_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_1_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Piece(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Piece', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_2_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_2_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_2_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 1 by-time textbox */
  txt_ep2Input_Method_Table_1_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 1 cumulative survival textbox */
  txt_ep2Input_Method_Table_1_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 2 by-time textbox */
  txt_ep2Input_Method_Table_2_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 2 cumulative survival textbox */
  txt_ep2Input_Method_Table_2_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 3 starting-time textbox */
  txt_ep2Input_Method_Table_3_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Starting_At_Time', { dynamicArgs });
  }

  /** EP2 period 3 hazard-rate textbox */
  txt_ep2Input_Method_Table_3_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** EP2 period 3 hazard-ratio textbox */
  txt_ep2Input_Method_Table_3_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 4 starting-time textbox */
  txt_ep2Input_Method_Table_4_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Starting_At_Time', { dynamicArgs });
  }

  /** EP2 period 4 hazard-rate textbox */
  txt_ep2Input_Method_Table_4_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** EP2 period 4 hazard-ratio textbox */
  txt_ep2Input_Method_Table_4_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 3 by-time textbox */
  txt_ep2Input_Method_Table_3_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 3 cumulative survival textbox */
  txt_ep2Input_Method_Table_3_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 4 by-time textbox */
  txt_ep2Input_Method_Table_4_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 4 cumulative survival textbox */
  txt_ep2Input_Method_Table_4_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 5 by-time textbox */
  txt_ep2Input_Method_Table_5_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 5 cumulative survival textbox */
  txt_ep2Input_Method_Table_5_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 5 hazard-ratio textbox */
  txt_ep2Input_Method_Table_5_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 6 by-time textbox */
  txt_ep2Input_Method_Table_6_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 6 cumulative survival textbox */
  txt_ep2Input_Method_Table_6_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 6 hazard-ratio textbox */
  txt_ep2Input_Method_Table_6_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 7 by-time textbox */
  txt_ep2Input_Method_Table_7_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 7 cumulative survival textbox */
  txt_ep2Input_Method_Table_7_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 7 hazard-ratio textbox */
  txt_ep2Input_Method_Table_7_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 8 by-time textbox */
  txt_ep2Input_Method_Table_8_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 8 cumulative survival textbox */
  txt_ep2Input_Method_Table_8_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 8 hazard-ratio textbox */
  txt_ep2Input_Method_Table_8_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2 period 9 by-time textbox */
  txt_ep2Input_Method_Table_9_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2By_Time', { dynamicArgs });
  }

  /** EP2 period 9 cumulative survival textbox */
  txt_ep2Input_Method_Table_9_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** EP2 period 9 hazard-ratio textbox */
  txt_ep2Input_Method_Table_9_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_By_Time', { dynamicArgs });
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
  txt_fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_fixed_Seed', { dynamicArgs });
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
