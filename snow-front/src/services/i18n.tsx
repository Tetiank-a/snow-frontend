import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// "Inline" English and Arabic translations. 
// We can localize to any language and any number of languages.
const resources = {
  en: {
    translation: {
      "Save": "Save",
      "name": "Name",
      "Unit: ": "Unit: ",
      "Shelf life: ": "Shelf life: ",
      "Description: ": "Description: ",
      "Submit": "Submit",
      "Users": "Users",
      "Products": "Products",
      "Supplies": "Supplies",
      "Warehouses": "Warehouses",
      "Relocation": "Relocation",
      "Statistics": "Statistics",
      "Log Out": "Log Out",
      "Tasks": "Tasks",
      "Sessions": "Sessions",
      "Settings": "Settings",
      "Nickname: ": "Nickname: ",
      "Roles: ": "Roles: ",
      "Name": "Name",
      "Surname": "Surname",
      "Email address": "Email address",
      "Available roles": "Available roles",
      "Chosen roles: ": "Chosen roles: ",
      "Add product": "Add product",
      "Create supply order": "Create supply order",
      "Warehouse": "Warehouse",
      "Creation date": "Creation date",
      "Status": "Status",
      "Create new warehouse": "Create new warehouse",
      "Address": "Address",
      "Email": "Email",
      "Destination warehouse:": "Destination warehouse:",
      "Text": "Text",
      "Chosen boxes:": "Chosen boxes:",
      "Relocate": "Relocate",
      "Total number of orders for all locations:": "Total number of orders for all locations:",
      "Number of users:": "Number of users:",
      "Total number of users:": "Total number of users:",
      "Password": "Password",
      "Enter email": "Enter email",
      "Enter password": "Enter password",
      "Enter name": "Enter name",
      "Enter surname": "Enter surname",
      "Enter address": "Enter address",
      "We'll never share your email with anyone else.": "We'll never share your email with anyone else.",
      "Enter password again": "Enter password again",
      "Confirm password": "Confirm password",
      "I agree with terms and conditions": "I agree with terms and conditions",
      "Sign In": "Sign In",
      "Sign Up": "Sign Up",
      "Available products": "Available products",
      "Chosen products": "Chosen products",
      "No chosen products": "No chosen products",
      "Enter description": "Enter description",
      "Enter shelf life (days)": "Enter shelf life (days)",
      "Task Info": "Task Info",
      "Edit User": "Edit User",
      "editUser": "Edit User",
      "editTask": "Edit Task",
      "Level": "Level",
      "Task creator": "Task creator",
    },
  },
  ua: {
    translation: {
      "Location" : "Локація",
      "Student" : "Учень",
      "Instructor": "Інструктор",
      "Time from" : "Час початку",
      "Time to" : "Час закінчення",
      "Find session": "Знайти тренування",
      "My sessions": "Мої тренування",
        "Task creator": "Урок створив",
      "Edit User": "Редагування користувача",
      "Create session": "Створити тренування",
      "Find sessions" : "Знайти тренування",
      "Tasks": "Уроки",
      "Sessions": "Тренування",
      "Settings": "Налаштування",
      "Enter shelf life (days)": "Введіть строк придатності (в днях)",
      "Enter description": "Введіть опис",
      "No chosen products": "Немає обраних продуктів",
      "Chosen products": "Обрані продукти",
      "Save": "Зберігти",
      "name": "Назва",
      "Unit: ": "Одиниці виміру: ",
      "Shelf life: ": "Термін придатності: ",
      "Description: ": "Опис: ",
      "Submit": "Далі",
      "Users": "Користувачі",
      "Products": "Продукти",
      "Supplies": "Поставки",
      "Warehouses": "Склади",
      "Relocation": "Переміщення",
      "Statistics": "Статистика",
      "Log Out": "Вихід",
      "Enter address": "Введіть адресу",
      "Nickname: ": "Ім'я: ",
      "Roles: ": "Ролі: ",
      "Name": "Ім'я",
      "Surname": "Прізвище",
      "Email address": "Пошта",
      "Available roles": "Доступні ролі",
      "Available products": "Доступні продукти",
      "Chosen roles: ": "Обрані ролі: ",
      "Add product": "Додати продукт",
      "Create supply order": "Створити замовлення поставки",
      "Warehouse": "Склад",
      "Creation date": "Дата створення",
      "Link": "Посилання",
      "Create new warehouse": "Створити новий склад",
      "Address": "Адреса",
      "Email": "Пошта",
      "Destination warehouse:": "Місце прибуття:",
      "Text": "Опис",
      "Chosen boxes:": "Обрані коробки:",
      "Relocate": "Перемістити",
      "Total number of orders for all locations:": "Загальне число замовлень для кожного складу:",
      "Number of users:": "Кількість користувачів:",
      "Total number of users:": "Загальна кількість користувачів:",
      "Password": "Пароль",
      "Enter email": "Введіть поштову адресу",
      "Enter password": "Введіть пароль",
      "Enter name": "Введіть ім'я",
      "Enter surname": "Введіть прізвище",
      "We'll never share your email with anyone else.": "Ми ніколи не поділимося ні з ким вашою поштою.",
      "Enter password again": "Введіть пароль ще раз",
      "Confirm password": "Підтвердіть пароль",
      "I agree with terms and conditions": "Я погоджуюся з умовами використання",
      "Sign In": "Увійти",
      "Sign Up": "Зареєструватися",
      "Task Info": "Інформація про урок",
      "editUser": "Редагувати користувача",
      "editTask": "Редагувати урок",
      "Level": "Рівень",
      "Add task": "Додати урок",
      "Search Session": "Зареєструватися на урок",
    },
  },
};
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;