Add-Type -AssemblyName System.Drawing

function Create-Crop($srcPath, $dstPath, $xPct, $yPct, $wPct, $hPct) {
    if (-not (Test-Path $srcPath)) { 
        Write-Warning "Source not found: $srcPath"
        return 
    }
    $bmp = [System.Drawing.Bitmap]::new($srcPath)
    $sw = $bmp.Width
    $sh = $bmp.Height
    
    $x = [int]($sw * $xPct)
    $y = [int]($sh * $yPct)
    $w = [int]($sw * $wPct)
    $h = [int]($sh * $hPct)
    
    if ($x + $w -gt $sw) { $w = $sw - $x }
    if ($y + $h -gt $sh) { $h = $sh - $y }
    
    $rect = [System.Drawing.Rectangle]::new($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $bmp.Dispose()
    
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    
    $cropped.Save($dstPath, $codec, $encoderParams)
    $cropped.Dispose()
    Write-Host "Created: $dstPath"
}

$dir = "c:\Users\S-Tech\Desktop\Auto repire\assets\images"

# 1. Index Journal cards
Create-Crop "$dir\about_mission_lab.jpg" "$dir\index_journal_canbus.jpg" 0.05 0.35 0.55 0.60
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\index_journal_bms.jpg" 0.15 0.20 0.70 0.75
Create-Crop "$dir\about_vision_ev.jpg" "$dir\index_journal_ev.jpg" 0.25 0.25 0.65 0.70

# 2. Home 2 unique images
Create-Crop "$dir\home2_hero_bg.jpg" "$dir\home2_hero_ev.jpg" 0.05 0.25 0.45 0.65
Create-Crop "$dir\about_mission_lab.jpg" "$dir\home2_bench_trace.jpg" 0.08 0.40 0.45 0.55
Create-Crop "$dir\home2_hero_bg.jpg" "$dir\home2_marquee_canbus.jpg" 0.40 0.15 0.55 0.75
Create-Crop "$dir\about_hero_master.jpg" "$dir\home2_marquee_parasitic.jpg" 0.20 0.45 0.65 0.52
Create-Crop "$dir\home1_luxury_lab.jpg" "$dir\home2_marquee_eps.jpg" 0.35 0.25 0.55 0.65

# 3. Service page unique images
Create-Crop "$dir\about_hero_bg.jpg" "$dir\service_hero_picoscope.jpg" 0.10 0.30 0.45 0.65
Create-Crop "$dir\about_hero_bg.jpg" "$dir\service_hero_battery_bench.jpg" 0.55 0.35 0.42 0.60
Create-Crop "$dir\about_hero_master.jpg" "$dir\service_card_ecu.jpg" 0.15 0.40 0.55 0.55
Create-Crop "$dir\about_mission_lab.jpg" "$dir\service_card_harness.jpg" 0.30 0.50 0.65 0.48
Create-Crop "$dir\about_vision_ev.jpg" "$dir\service_card_ev.jpg" 0.30 0.30 0.60 0.65
Create-Crop "$dir\jump_start.jpg" "$dir\service_card_roadside.jpg" 0.05 0.05 0.90 0.90

# Case studies
Create-Crop "$dir\home1_luxury_lab.jpg" "$dir\case_audi_canbus.jpg" 0.08 0.20 0.50 0.70
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\case_bmw_battery.jpg" 0.20 0.25 0.65 0.70
Create-Crop "$dir\team_marcus.jpg" "$dir\case_porsche_alternator.jpg" 0.25 0.50 0.70 0.48
Create-Crop "$dir\about_mission_lab.jpg" "$dir\case_mercedes_loom.jpg" 0.20 0.45 0.75 0.52
Create-Crop "$dir\battery_charging.jpg" "$dir\case_battery_recond.jpg" 0.05 0.05 0.90 0.90
Create-Crop "$dir\about_vision_ev.jpg" "$dir\case_tesla_isolation.jpg" 0.15 0.15 0.55 0.75

# 4. Service Detail unique images
Create-Crop "$dir\about_hero_master.jpg" "$dir\detail_service_1_ecu.jpg" 0.25 0.05 0.70 0.85
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\detail_service_2_battery.jpg" 0.10 0.15 0.80 0.80
Create-Crop "$dir\team_marcus.jpg" "$dir\detail_service_3_alternator.jpg" 0.10 0.45 0.85 0.52
Create-Crop "$dir\about_mission_lab.jpg" "$dir\detail_service_4_harness.jpg" 0.10 0.30 0.85 0.65
Create-Crop "$dir\about_vision_ev.jpg" "$dir\detail_service_5_ev.jpg" 0.20 0.10 0.75 0.85
Create-Crop "$dir\jump_start.jpg" "$dir\detail_service_6_jump.jpg" 0.10 0.10 0.80 0.80

# 5. Pricing page unique images
Create-Crop "$dir\home1_luxury_lab.jpg" "$dir\pricing_hero_bay.jpg" 0.10 0.25 0.48 0.68
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\pricing_hero_batt.jpg" 0.18 0.25 0.65 0.68
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\pricing_card_1.jpg" 0.15 0.30 0.60 0.65
Create-Crop "$dir\battery_replacement.jpg" "$dir\pricing_card_2.jpg" 0.05 0.05 0.90 0.90
Create-Crop "$dir\team_marcus.jpg" "$dir\pricing_card_3.jpg" 0.30 0.55 0.65 0.42
Create-Crop "$dir\starter_motor.jpg" "$dir\pricing_card_4.jpg" 0.05 0.05 0.90 0.90
Create-Crop "$dir\about_hero_master.jpg" "$dir\pricing_card_5.jpg" 0.20 0.40 0.60 0.55
Create-Crop "$dir\about_mission_lab.jpg" "$dir\pricing_card_6.jpg" 0.15 0.45 0.75 0.50

# 6. Pricing detail unique images
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\pricing_detail_1_conductance.jpg" 0.20 0.20 0.60 0.70
Create-Crop "$dir\battery_replacement.jpg" "$dir\pricing_detail_2_oem.jpg" 0.10 0.10 0.80 0.80
Create-Crop "$dir\alternator_repair.jpg" "$dir\pricing_detail_3_ripple.jpg" 0.05 0.05 0.90 0.90
Create-Crop "$dir\starter_motor.jpg" "$dir\pricing_detail_4_starter.jpg" 0.10 0.10 0.80 0.80
Create-Crop "$dir\about_hero_master.jpg" "$dir\pricing_detail_5_ecu.jpg" 0.10 0.35 0.65 0.60
Create-Crop "$dir\about_mission_lab.jpg" "$dir\pricing_detail_6_harness.jpg" 0.25 0.40 0.70 0.55

# 7. Technology page unique images
Create-Crop "$dir\about_hero_bg.jpg" "$dir\tech_hero_bg.jpg" 0.00 0.00 1.00 1.00
Create-Crop "$dir\about_mission_lab.jpg" "$dir\tech_hero_pico.jpg" 0.08 0.42 0.38 0.50
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\tech_hero_midtronics.jpg" 0.12 0.25 0.55 0.65
Create-Crop "$dir\about_mission_lab.jpg" "$dir\tech_card_picoscope.jpg" 0.05 0.38 0.40 0.55
Create-Crop "$dir\about_hero_conductance.jpg" "$dir\tech_card_midtronics.jpg" 0.15 0.18 0.65 0.75
Create-Crop "$dir\team_marcus.jpg" "$dir\tech_card_dyno.jpg" 0.32 0.52 0.62 0.45
Create-Crop "$dir\about_sanctuary_facility.jpg" "$dir\tech_card_thermal.jpg" 0.65 0.30 0.32 0.65
Create-Crop "$dir\about_sanctuary_facility.jpg" "$dir\tech_cinematic_lab.jpg" 0.05 0.10 0.90 0.85

# 8. Contact page unique images
Create-Crop "$dir\about_sanctuary_facility.jpg" "$dir\contact_hero_bg.jpg" 0.00 0.00 1.00 1.00
Create-Crop "$dir\home2_hero_bg.jpg" "$dir\contact_hero_reception.jpg" 0.58 0.35 0.38 0.55
Create-Crop "$dir\home2_hero_bg.jpg" "$dir\contact_hero_dispatch.jpg" 0.08 0.30 0.40 0.60

Write-Host "Created all distinct bespoke images successfully!"
