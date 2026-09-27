// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: b6e6503372de09eeebfbab5afd0728d96ece9b78b338671cc34220b45570cce1)
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

  /** textbox from codegen */
  txt_ep2P(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2P', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Q(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Q', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Target_Num_Of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Target_Num_Of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Non_Inf_Margin(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Non_Inf_Margin', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Parameter', { dynamicArgs });
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
  txt_ep1Fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Fut_Param_Gamma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Value_of_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Value_of_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_ep1Fut_Bound_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep1Fut_Bound_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_ep1Fut_Bound_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_ep1Fut_Bound_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Eff_Param_Gamma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Fut_Param_Gamma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Fut_Target_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Fut_Target_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_ep2Fut_Bound_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Bound_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_ep2Fut_Bound_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_ep2Fut_Bound_Input', { dynamicArgs });
  }

  /** native <select> - importer's repeated-modal collapse dropped this one, hand-added from recording.txt line 143 */
  ddl_ep1Fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep1Fut_Spend_Func', { dynamicArgs });
  }

  /** native <select> - importer's repeated-modal collapse dropped this one, hand-added from recording.txt line 145 */
  ddl_ep1Fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep1Fut_Param', { dynamicArgs });
  }

  /** native <select> - EP2's Hypothesis, hand-added (importer collapse) */
  ddl_ep2Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Hypothesis', { dynamicArgs });
  }

  /** native <select> - EP2's Test Statistic, hand-added (importer collapse) */
  ddl_ep2Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Test_Statistic', { dynamicArgs });
  }

  /** native <select> - EP2's Efficacy Boundary Family, hand-added (importer collapse) */
  ddl_ep2Eff_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Boundary_Family', { dynamicArgs });
  }

  /** native <select> - EP2's Efficacy Spending Function, hand-added (importer collapse) */
  ddl_ep2Eff_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Spend_Func', { dynamicArgs });
  }

  /** native <select> - EP2's Efficacy Parameter, hand-added (importer collapse) */
  ddl_ep2Eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Eff_Param', { dynamicArgs });
  }

  /** native <select> - EP2's Futility Boundary Family, hand-added (importer collapse) */
  ddl_ep2Fut_Boundary_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Boundary_Family', { dynamicArgs });
  }

  /** native <select> - EP2's Futility Spending Function, hand-added (importer collapse) */
  ddl_ep2Fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Spend_Func', { dynamicArgs });
  }

  /** native <select> - EP2's Futility Parameter, hand-added (importer collapse) */
  ddl_ep2Fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Fut_Param', { dynamicArgs });
  }

  /** native <select> - EP2's Distribution, hand-added (importer collapse) */
  ddl_ep2Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Distribution', { dynamicArgs });
  }

  /** native <select> - EP2's Hazard Ratio Modifier, hand-added (importer collapse) */
  ddl_ep2Hazard_Ratio_Modifier(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_ep2Hazard_Ratio_Modifier', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Synchronize_Interims(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Synchronize_Interims', { dynamicArgs });
  }

  /** Analysis Spacing Info at Interim analyses kept same as the other endpoint - EP1-primary mode (Synchronize Interims=Based on EP1 or its default). Confirmed live, id matches the testdata column name exactly */
  chk_keep_Analysis_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info', { dynamicArgs });
  }

  /** Analysis Spacing Info at Interim analyses kept same as the other endpoint - EP2-primary mode (Synchronize Interims=Based on EP2, incl. its default when Winning Condition=At least EP2). DIFFERENT DOM id from chk_keep_Analysis_Info - confirmed live via user DevTools screenshot on ITER_07 */
  chk_keep_Analysis_Info_EP1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_keep_Analysis_Info_EP1', { dynamicArgs });
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

  /** checkbox from codegen */
  chk_boundary_1_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
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

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_0_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep1Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_1_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep1Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_2_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep1Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_2_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep1Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_3_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep1Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_3_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep1Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_4_ep1Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_4_ep1Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_4_ep1Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_4_ep1Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_0_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_0_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_1_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_1_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_2_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_2_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_3_ep2Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep2Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_0_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_0_ep2Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_1_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_1_ep2Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_2_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_2_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_2_ep2Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_3_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_3_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_3_ep2Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_4_ep2Efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_4_ep2Efficacy_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  chk_boundary_4_ep2Futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_boundary_4_ep2Futility_Check', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_3_ep1Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep1Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_4_ep1Analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_4_ep1Analysis_Spacing_Info', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_3_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_3_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** boundary cell (table-completeness - dual-endpoint interim table) */
  txt_boundary_4_ep1Threshold_Per_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_boundary_4_ep1Threshold_Per_Interim', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Endpoint_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Endpoint_Rules', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_endpoint_Sub_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_endpoint_Sub_Rules', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_react_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_react_select_input_container', { dynamicArgs });
  }

  /** Clears Correlation's current default-selected tag before picking a new one - confirmed live, the field always starts with a value already selected (not blank), so this must run before every select. Uses the stable semantic react-select class, not the auto-generated css-8mmkcg hash next to it in the DOM (hash classes regenerate on rebuild and can silently break). */
  btn_Correlation_Clear(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Correlation_Clear', { dynamicArgs });
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
  txt_ep1Input_Method_Table_0_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Median_Survival_Time_Control', { dynamicArgs });
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

  /** EP1's Add Piece button, scoped to the container holding EP1's InputMethodTable fields - the button's own id ("addButton") is generic/non-unique and shared with EP2's button, and its position on the page shifts depending on whether EP1 even renders one (only when EP1 is Piecewise) - confirmed live via screenshot, container-scoping avoids the positional ambiguity entirely. VERIFY the card-body container class live before trusting. */
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

  /** textbox from codegen */
  txt_ep2Input_Method_Table_3_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_3_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ep2Input_Method_Table_3_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Hazard_Ratio', { dynamicArgs });
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

  /** DesignPage-scoped anchor to wait for the Enrollment tab's table to render before reconcilePeriodTable runs (the reconcile step found 0 live rows when run immediately after the Enrollment click - a render-timing gap, not a config error) */
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

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 0) */
  txt_ep1Input_Method_Table_0_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_0_ep1Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep1Input_Method_Table_1_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep1Input_Method_Table_1_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep1Input_Method_Table_1_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_1_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep1Input_Method_Table_2_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep1Input_Method_Table_2_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep1Input_Method_Table_2_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_2_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep1Input_Method_Table_3_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_3_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep1Input_Method_Table_4_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_4_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep1Input_Method_Table_5_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_5_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep1Input_Method_Table_6_ep1Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep1Input_Method_Table_6_ep1Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 0) */
  txt_ep2Input_Method_Table_0_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_0_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep2Input_Method_Table_1_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep2Input_Method_Table_1_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 1) */
  txt_ep2Input_Method_Table_1_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_1_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep2Input_Method_Table_2_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep2Input_Method_Table_2_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 2) */
  txt_ep2Input_Method_Table_2_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_2_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep2Input_Method_Table_3_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep2Input_Method_Table_3_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 3) */
  txt_ep2Input_Method_Table_3_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_3_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 4) */
  txt_ep2Input_Method_Table_4_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_4_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 5) */
  txt_ep2Input_Method_Table_5_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_5_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 6) */
  txt_ep2Input_Method_Table_6_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_6_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 7) */
  txt_ep2Input_Method_Table_7_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_7_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 8) */
  txt_ep2Input_Method_Table_8_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_8_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Starting_At_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2By_Time', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Hazard_Rate_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Median_Survival_Time_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2Cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** table-completeness (multi-piece Add Piece table, period 9) */
  txt_ep2Input_Method_Table_9_ep2Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ep2Input_Method_Table_9_ep2Hazard_Ratio', { dynamicArgs });
  }

  /** EP2's Add Piece button, scoped to the container holding EP2's InputMethodTable fields - supersedes an nth-match(2) positional guess that failed live: EP2's button is only the 2nd on the page when EP1 is ALSO Piecewise, but is the 1st (only) one when EP1 is Exponential (no button rendered for EP1 at all), confirmed on ITER_01 (EP1=Exponential, EP2=Piecewise). VERIFY the card-body container class live before trusting. */
  btn_Add_Piece_EP2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Piece_EP2', { dynamicArgs });
  }
}
