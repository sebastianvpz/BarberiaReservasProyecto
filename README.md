# 🪮 BarberPro - Premium Booking Experience

![BarberPro Hero](https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=60)

**BarberPro** es una plataforma de reserva de citas de lujo diseñada para ofrecer una experiencia de usuario impecable. El proyecto se enfoca en la eficiencia, el diseño visual premium y la automatización de procesos para negocios de cuidado personal.

---

## 🔗 Demo en Vivo
🚀 **[Ver el proyecto desplegado aquí](https://barberia-sebastianvelarde.vercel.app/)**

---

## ✨ Características Destacadas

* **📅 Flujo de Reserva Dinámico:** Sistema por pasos (Stepper) con transición de estados fluida.
* **✅ Validación de Disponibilidad Real:** Consulta directa a base de datos para bloquear horarios ocupados y evitar solapamientos.
* **🕒 Lógica de Tiempo Inteligente:** Bloqueo automático de fechas pasadas y horas que ya han transcurrido en el día actual.
* **📧 Confirmación por Email:** Integración con **EmailJS** para enviar comprobantes de cita automáticos al cliente.
* **🎭 Animaciones Cinematográficas:** Uso de **Framer Motion** para efectos de cascada (stagger) y transiciones de página suaves.
* **⚡ Carga Optimizada:** Implementación de *Skeletons* para mejorar el rendimiento percibido durante las consultas a la API.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **React + Vite** | Core del Frontend y empaquetado optimizado. |
| **Supabase** | Base de datos PostgreSQL y seguridad de datos (RLS). |
| **Framer Motion** | Motor de animaciones y micro-interacciones. |
| **EmailJS** | Automatización de correos electrónicos transaccionales. |
| **Lucide React** | Librería de iconos minimalistas. |
| **CSS3 Custom Props** | Diseño basado en variables para un tema *Dark & Gold* consistente. |

---

## 🛡️ Seguridad y Datos

El proyecto implementa políticas de seguridad de nivel de fila (**RLS**) en la base de datos, permitiendo que el cliente interactúe de forma segura con la agenda sin necesidad de autenticación, protegiendo la integridad de las reservas existentes.

---

## 👨‍💻 Autor
Desarrollado con enfoque en UI/UX por Sebastian Velarde.

---