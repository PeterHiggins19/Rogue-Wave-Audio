# RWA Repository Organizer
# Run from D:\GitHub\RWA after copying scaffolding files and all source files
# DRY RUN: Set $DryRun = $true to preview without moving

param([switch]$DryRun)

$root = "D:\GitHub\RWA"

function Move-Safe {
    param([string]$Source, [string]$Dest)
    if (Test-Path $Source) {
        $destDir = Split-Path $Dest -Parent
        if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
        if ($DryRun) {
            Write-Host "[DRY RUN] $Source -> $Dest" -ForegroundColor Yellow
        } else {
            Copy-Item $Source $Dest -Force
            Write-Host "[MOVED] $Source -> $Dest" -ForegroundColor Green
        }
    } else {
        Write-Host "[SKIP] Not found: $Source" -ForegroundColor DarkGray
    }
}

Write-Host "=== RWA Repository Organizer ===" -ForegroundColor Cyan
if ($DryRun) { Write-Host "DRY RUN MODE - no files will be moved" -ForegroundColor Yellow }

# --- Papers ---
Write-Host "`n--- Papers ---" -ForegroundColor Cyan
Move-Safe "$root\Organic_Digital_Loudspeakers_v2.6.docx" "$root\docs\papers\Organic_Digital_Loudspeakers_v2.6.docx"
Move-Safe "$root\Dimension-Apportioned Diffraction Correction and Inference (DADC-DADI).docx" "$root\docs\papers\Dimension-Apportioned_Diffraction_Correction_and_Inference_DADC-DADI.docx"

# --- BTL Lab ---
Write-Host "`n--- BTL Lab Certification ---" -ForegroundColor Cyan
Move-Safe "$root\BTL\BTL Small Studio Lab\BTL Certification - RWA Lab 012725.pdf" "$root\docs\btl-lab\certification\BTL_Certification_RWA_Lab_012725.pdf"
Move-Safe "$root\BTL\BTL Small Studio Lab\btl studio lab Complete certification worksheet.pdf" "$root\docs\btl-lab\certification\BTL_Complete_Certification_Worksheet.pdf"

Write-Host "`n--- BTL Lab Design ---" -ForegroundColor Cyan
Move-Safe "$root\BTL\BTL Plans.pdf" "$root\docs\btl-lab\design\BTL_Plans.pdf"
Move-Safe "$root\BTL\BTL Small Studio Lab\BTL Design Lab 011825.pdf" "$root\docs\btl-lab\design\BTL_Design_Lab_011825.pdf"
Move-Safe "$root\BTL\BTL Small Studio Lab\BTL Linear Design 012825.pdf" "$root\docs\btl-lab\design\BTL_Linear_Design_012825.pdf"
Move-Safe "$root\BTL\BTL Small Studio Lab\BTL studio complete system design.pdf" "$root\docs\btl-lab\design\BTL_Studio_Complete_System_Design.pdf"
Move-Safe "$root\BTL\BTL Small Studio Lab\Rectangular cabinet diffraction equalization BTL 01232025.pdf" "$root\docs\btl-lab\design\Rectangular_Cabinet_Diffraction_Equalization_BTL_01232025.pdf"

Write-Host "`n--- BTL Lab Guides ---" -ForegroundColor Cyan
Move-Safe "$root\BTL_Build_Guide_v1.0.docx" "$root\docs\btl-lab\guides\BTL_Build_Guide_v1.0.docx"

# --- Datasheets -> reference/restricted ---
Write-Host "`n--- Reference Materials ---" -ForegroundColor Cyan
Move-Safe "$root\The Higgins Operator H1 101.pdf" "$root\docs\reference\redistributable\The_Higgins_Operator_H1_101.pdf"
Move-Safe "$root\aes doc.docx" "$root\docs\reference\restricted-or-link-only\aes_doc.docx"

# --- Data: Current Simulation ---
Write-Host "`n--- BTL Lab Data ---" -ForegroundColor Cyan
Move-Safe "$root\BTL\BTL Small Studio Lab\Current Design Simulation\BTL Studio Lab Design 012625 Rogue Wave Audio_Small Studio Lab.xlsx" "$root\data\btl-lab\current\BTL_Studio_Lab_Design_012625.xlsx"
Move-Safe "$root\BTL\BTL Small Studio Lab\Current Design Simulation\BTL Studio Lab Measurement 012625 Rogue Wave Audio_Small Studio Lab.xlsx" "$root\data\btl-lab\current\BTL_Studio_Lab_Measurement_012625.xlsx"
Move-Safe "$root\BTL\BTL Small Studio Lab\DIMENSION-APPORTIONED DIFFRACTION CORRECTION 3.txt" "$root\data\btl-lab\notes\DIMENSION-APPORTIONED_DIFFRACTION_CORRECTION_3.txt"

# --- Builders ---
Write-Host "`n--- Builder Scripts ---" -ForegroundColor Cyan
Move-Safe "$root\build_organic_digital_paper_v2_6.js" "$root\src\builders\build_organic_digital_paper_v2_6.js"
Move-Safe "$root\build_btl_guide.js" "$root\src\builders\build_btl_guide.js"
Move-Safe "$root\build_btl_guide.py" "$root\src\builders\build_btl_guide.py"

# --- Tools ---
Write-Host "`n--- Tools ---" -ForegroundColor Cyan
Move-Safe "$root\CODE\BTL_DADC_DADI_ADAC_Tool_v1_1_lazyhuman_quickstart_FIXED2.ipynb" "$root\src\tools\dadc-dadi\BTL_DADC_DADI_ADAC_Tool_v1_1.ipynb"

# --- Concepts ---
Write-Host "`n--- Concepts ---" -ForegroundColor Cyan
Move-Safe "$root\Concepts\V∞Core Project.txt" "$root\concepts\v-infinity-core\V_Infinity_Core_Project.txt"
Move-Safe "$root\Concepts\V∞Core V3.0 Hilbert Oneness Operat.txt" "$root\concepts\v-infinity-core\V_Infinity_Core_V3.0_Hilbert.txt"
Move-Safe "$root\Concepts\# V∞Core Ultimate Engine V2.0 - Complete.txt" "$root\concepts\v-infinity-core\V_Infinity_Core_Ultimate_Engine_V2.0.txt"
Move-Safe "$root\Concepts\Complete categorized index of all RMU units in V∞Core V4.1.txt" "$root\concepts\v-infinity-core\RMU_Index_V4.1.txt"
Move-Safe "$root\Concepts\V∞Core dialog.txt" "$root\concepts\v-infinity-core\V_Infinity_Core_Dialog.txt"
Move-Safe "$root\Concepts\Entropix - Entropy-Balanced Regime Augmented Adaptive Predictive Engine.txt" "$root\concepts\entropix\Entropix_Engine.txt"
Move-Safe "$root\Concepts\# Entropix Regimes Expansion Docume.txt" "$root\concepts\entropix\Entropix_Regimes_Expansion.txt"
Move-Safe "$root\Concepts\TF_BTL.txt" "$root\concepts\tensor-acoustic-forge\TF_BTL.txt"
Move-Safe "$root\Concepts\Manual Pipeline Process for TensorAcousticForge Framework with Classic PEQ Filter Outputs.txt" "$root\concepts\tensor-acoustic-forge\Manual_Pipeline_Process.txt"
Move-Safe "$root\Concepts\tkf_complete.py" "$root\concepts\tensor-acoustic-forge\tkf_complete.py"
Move-Safe "$root\Concepts\UniDiffrax.docx" "$root\concepts\regimes\UniDiffrax.docx"
Move-Safe "$root\Concepts\Universal Regimes.svg" "$root\concepts\regimes\Universal_Regimes.svg"
Move-Safe "$root\Concepts\governance_regimes_500.txt" "$root\concepts\regimes\governance_regimes_500.txt"
Move-Safe "$root\Concepts\industry_infrastructure_regimes.txt" "$root\concepts\regimes\industry_infrastructure_regimes.txt"
Move-Safe "$root\Concepts\rsm-regimes-7776.jsonld" "$root\concepts\regimes\rsm-regimes-7776.jsonld"

# Grok reports
$grokReports = Get-ChildItem "$root\Concepts\grok_report*.pdf" -ErrorAction SilentlyContinue
foreach ($report in $grokReports) {
    $safeName = $report.Name -replace ' ', '_' -replace '[()]', ''
    Move-Safe $report.FullName "$root\concepts\ai-reports\$safeName"
}

# --- Datasheets to archive (redistribution TBD) ---
Write-Host "`n--- Datasheets (archive pending redistribution check) ---" -ForegroundColor Cyan
Move-Safe "$root\BTL\32w-4878t01.pdf" "$root\archive\reference-materials\32w-4878t01.pdf"
Move-Safe "$root\BTL\r2904-700000.pdf" "$root\archive\reference-materials\r2904-700000.pdf"
Move-Safe "$root\BTL\x3-06_exotic-t35.pdf" "$root\archive\reference-materials\x3-06_exotic-t35.pdf"
Move-Safe "$root\BTL\e0043_m15ch002_datasheet.pdf" "$root\archive\reference-materials\e0043_m15ch002_datasheet.pdf"

# --- Archive: OLD and TEST ---
Write-Host "`n--- Archive: Superseded ---" -ForegroundColor Cyan
if (Test-Path "$root\BTL\BTL Small Studio Lab\OLD") {
    Copy-Item "$root\BTL\BTL Small Studio Lab\OLD\*" "$root\archive\btl-lab\old\" -Recurse -Force
    Write-Host "[MOVED] BTL OLD -> archive\btl-lab\old\" -ForegroundColor Green
}
if (Test-Path "$root\BTL\BTL Small Studio Lab\TEST") {
    Copy-Item "$root\BTL\BTL Small Studio Lab\TEST\*" "$root\archive\btl-lab\test\" -Recurse -Force
    Write-Host "[MOVED] BTL TEST -> archive\btl-lab\test\" -ForegroundColor Green
}

# --- Archive: Build logs ---
Write-Host "`n--- Archive: Build Logs ---" -ForegroundColor Cyan
Move-Safe "$root\BUILD_LOG_v2_4.txt" "$root\archive\build-logs\BUILD_LOG_v2_4.txt"
Move-Safe "$root\v2.6_BUILD_SUMMARY.md" "$root\archive\build-logs\v2.6_BUILD_SUMMARY.md"
Move-Safe "$root\v2.6_FINAL_CHECKLIST.txt" "$root\archive\build-logs\v2.6_FINAL_CHECKLIST.txt"
Move-Safe "$root\Concepts\tkf_runtime.log" "$root\archive\runtime-logs\tkf_runtime.log"

# --- Archive: Reference materials ---
Move-Safe "$root\grok_report - 2026-01-06T190103.824.pdf" "$root\archive\reference-materials\grok_report_2026-01-06.pdf"
Move-Safe "$root\inspirations\20240920_PETER#19_001.pdf" "$root\archive\reference-materials\20240920_PETER19_001.pdf"
Move-Safe "$root\Concepts\d-d-d-a6.pdf" "$root\archive\reference-materials\d-d-d-a6.pdf"

Write-Host "`n=== Done ===" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Review the moved files" -ForegroundColor White
Write-Host "  2. Check THIRD_PARTY_SOURCES.md for redistribution decisions" -ForegroundColor White
Write-Host "  3. Run: git init && git add -A && git commit -m 'Initial repo structure'" -ForegroundColor White
Write-Host "  4. Consider enabling Git LFS: git lfs install && git lfs track '*.docx' '*.pdf' '*.xlsx'" -ForegroundColor White
