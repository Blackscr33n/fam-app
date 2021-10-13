import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  public settingsForm: FormGroup;
  public languages = [];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      language: new FormControl(localStorage.getItem('lang') || 'en')
    });

    this.loadLanguageLabels();
  }

  public saveSettings(): void {
    this.translate.use(this.settingsForm.value.language);
    localStorage.setItem('lang', this.settingsForm.value.language);
    this.loadLanguageLabels();
  }

  private loadLanguageLabels(): void {
    this.translate.get('settings').subscribe(data => {
      this.languages = [
        { value: 'en', label: data.english},
        { value: 'de', label: data.german}
      ]
    });
  }

}
