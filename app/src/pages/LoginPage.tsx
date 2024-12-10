import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Select, Box, Title, MantineProvider } from "@mantine/core";
import { baseUrl } from "../config";

export function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const redirectByRole = (userRole: string) => {
    switch (userRole) {
      case 'SuperAdmin':
        navigate('/superadmin');
        break;
      case 'Admin':
        navigate('/admin');
        break;
      case 'Client':
        navigate('/client');
        break;
      case 'Prestataire':
        navigate('/prestataire');
        break;
      default:
        navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegisterMode ? '/auth/register' : '/auth/login';
    const payload = isRegisterMode ? {
      firstName,
      lastName,
      emailAddress,
      password,
      role
    } : {
      emailAddress,
      password
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Error:", errData);
        alert("Erreur lors de l'authentification");
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      redirectByRole(data.user.role);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'authentification");
    }
  };

  return (
    <MantineProvider>
    <Box style={{ maxWidth: 400, margin: "auto", marginTop: "50px" }}>
      <Title order={2} mb="md">{isRegisterMode ? "Inscription" : "Connexion"}</Title>
      <form onSubmit={handleSubmit}>
        {isRegisterMode && (
          <>
            <TextInput
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              mt="md"
            />
            <TextInput
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              mt="md"
            />
            <Select
              label="Rôle"
              data={[
                { value: 'SuperAdmin', label: 'Super Admin' },
                { value: 'Admin', label: 'Admin' },
                { value: 'Client', label: 'Client' },
                { value: 'Prestataire', label: 'Prestataire' },
              ]}
              value={role}
              onChange={(value) => setRole(value!)}
              required
              mt="md"
            />
          </>
        )}
        <TextInput
          label="Email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
          mt="md"
        />
        <PasswordInput
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        <Button type="submit" mt="md">{isRegisterMode ? "S'inscrire" : "Se connecter"}</Button>
      </form>
      <Button variant="subtle" mt="sm" onClick={() => setIsRegisterMode(!isRegisterMode)}>
        {isRegisterMode ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
      </Button>
    </Box>
    </MantineProvider>
  );
}
