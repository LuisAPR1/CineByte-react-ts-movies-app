import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  deleteAccount,
  updateName,
  updatePassword,
} from "../modules/UserService";

// Importa o arquivo CSS para estilização.
import "../styles/EditAccountStyle.css";

// Componente funcional para a página de edição de conta.
const EditAccount: React.FC = () => {
  // Obtém informações do utilizador autenticado a partir do contexto.
  const { user } = useContext(AuthContext);

  // Estados locais para lidar com as informações do utilizador e modos de edição.
  const [name, setName] = useState(user?.username || "User name");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Atualiza o estado do nome do utilizador quando o input é alterado.
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Alterna o modo de edição para o nome do utilizador.
  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  // Alterna o modo de edição para a senha.
  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  // Atualiza os estados das senhas conforme o utilizador preenche os campos.
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Função para apagar a conta do utilizador.
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      // Chama o serviço para apagar a conta.
      await deleteAccount();
      alert("Account deleted successfully.");
      localStorage.removeItem("token"); // Remove o token armazenado.
      window.location.href = "/login"; // Redireciona para a página de login.
    } catch (err) {
      console.error(err);
      alert("Error deleting the account.");
    }
  };

  // Função para salvar o novo nome do utilizador.
  const saveName = async () => {
    try {
      // Chama o serviço para atualizar o nome.
      await updateName(name);
      alert("Name updated successfully!");
      toggleEditName(); // Sai do modo de edição.
    } catch (err) {
      console.error(err);
      alert("Error updating the name.");
    }
  };

  // Função para salvar a nova senha.
  const savePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Chama o serviço para atualizar a senha.
      await updatePassword(currentPassword, newPassword);
      alert("Password updated successfully!");
      toggleEditPassword(); // Sai do modo de edição.
    } catch (err) {
      console.error(err);
      alert("Error updating the password.");
    }
  };

  // Renderiza o formulário de edição de conta com diferentes seções.
  return (
    <div className="page-wrapper">
      <h1 className="page-title">Edit Account</h1>

      <div className="card">
        <div className="section">
          <label className="label">Name:</label>
          <div className="inline">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="input"
                />
                <button className="save-button" onClick={saveName}>
                  Save
                </button>
                <button className="cancel-button" onClick={toggleEditName}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="text">{name}</span>
                <button className="edit-button" onClick={toggleEditName}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        <div className="section">
          <label className="label">Email:</label>
          <input
            type="email"
            value={user?.email || "email@example.com"}
            readOnly
            className="input readonly-input"
          />
        </div>

        <div className="section">
          <h2 className="sub-title">Change Password</h2>
          {!isEditingPassword ? (
            <button className="edit-button" onClick={toggleEditPassword}>
              Change Password
            </button>
          ) : (
            <div className="password-section">
              <label className="label">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handlePasswordChange}
                className="input"
              />

              <label className="label">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="input"
              />

              <label className="label">Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="input"
              />

              <div className="inline">
                <button className="save-button" onClick={savePassword}>
                  Save Password
                </button>
                <button className="cancel-button" onClick={toggleEditPassword}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <button className="delete-button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
