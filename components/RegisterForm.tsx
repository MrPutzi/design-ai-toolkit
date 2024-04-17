import React, {useCallback, useState, ChangeEvent, FormEvent} from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Registrácia úspešná!");
            } else {
                console.error("Registrácia zlyhala:", data.error);
            }
        } catch (error) {
            console.error("Chyba pri registrácii:", error);
        }
    }, [formData]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Zadajte svoj email"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Heslo</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Zadajte svoje heslo"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Registrovať sa
            </button>
        </form>
    );
};

export default RegisterForm;