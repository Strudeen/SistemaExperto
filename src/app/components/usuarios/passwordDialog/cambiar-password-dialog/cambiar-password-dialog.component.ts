import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { passwordValidator } from 'src/app/validators/password-validator';

@Component({
  selector: 'app-cambiar-password-dialog',
  templateUrl: './cambiar-password-dialog.component.html',
  styleUrls: ['./cambiar-password-dialog.component.css']
})
export class CambiarPasswordDialogComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CambiarPasswordDialogComponent>
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value 
      ? null : { 'mismatch': true };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      // Aquí se manejaría la lógica para guardar la nueva contraseña
      console.log('Nueva contraseña:', newPassword);
      this.dialogRef.close(newPassword);
    }
  }
}