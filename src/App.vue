<template>
    <div class="form-box">
        <form @submit.prevent="checkData" class="form">
            <span class="title">{{ titleText }}</span>
            <span class="subtitle">FoodDelivery</span>


            <div class="form-container">

                <input type="text" class="input" placeholder="Username" v-model="loginRef" v-if="typeRef === 'REG'" />
                <input type="email" class="input" placeholder="Email" v-model="emailRef" />
                <input type="password" class="input" placeholder="Password" v-model="passwordRef" />
            </div>
            <button> <span>{{ titleText }}</span></button>
        </form>
        <div class="form-section">
            <p>
                {{ accText }}
                <span class="link" @click="toggleType">{{ linkText }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
/* imports */
import { ref, computed } from "vue";
import axios from "axios";

import notification from './assets/Notification';
/*form logic*/
const loginRef = ref("");
const emailRef = ref("");
const passwordRef = ref("");
const checkData = async () => {
    const validatedPassword = checkPassword(passwordRef.value);

    if (validatedPassword === undefined) {
        // Пароль не соответствует требованиям, выведите предупреждение
        console.log("Пароль не соответствует требованиям");
        // Здесь вы можете выполнить дополнительные действия, такие как отображение сообщения пользователю о неправильном пароле
    } else {
        // Пароль соответствует требованиям, продолжите отправку данных на сервер
        const yourJson = {
            username: loginRef.value,
            email: typeRef.value === "REG" ? emailRef.value : loginRef.value,
            password: typeRef.value === "REG" ? validatedPassword : passwordRef.value,
            role: "user"
        };
        try {
            if (typeRef.value === "REG") {
                console.log("Регистрация");
                await axios.post(
                    //тут пишешь урл к апи при регистрации
                    "http://localhost:8080/users/register",
                    {
                        ...yourJson,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log("Зарегал");
            } else {
                console.log("Логин");
                await axios.post(
                    //тут пишешь урл к апи при логине
                    "http://localhost:8080/users/login",
                    {
                        ...yourJson
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log("Залогинил");
            }
        } catch (error) {
            notification.error("Неверный email или пароль");
        }
        console.log(yourJson);
    }
};
/* Reg or login */
const checkPassword = (password) => {
    if (password.length < 7 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return notification.error("Пароль должен вкулючать: не меньше 7 символов, заглавную букву и цифры.");
    } else {
        return password;
    }
}
const typeRef = ref("LOG");
const linkText = computed(() =>
    typeRef.value === "REG" ? "Войти" : "Создать аккаунт"
);
const titleText = computed(() =>
    typeRef.value === "REG" ? "Регистрация" : "Вход"
);
const toggleType = () => {
    typeRef.value === "REG" ? (typeRef.value = "LOG") : (typeRef.value = "REG");
};

const accText = computed(() =>
    typeRef.value === "REG" ? "Уже есть аккаунт?" : "Еще нет аккаунта?"
);
</script>

<style scoped>
.link {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
}

.form-box {
    max-width: 600px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
    width: 100%;
}

.form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 52px 44px 92px;
    gap: 10px;
    text-align: center;
}


/*Form text*/
.title {
    font-weight: bold;
    font-size: 1.6rem;
}

.subtitle {
    font-size: 1rem;
    color: #666;
}

/*Inputs box*/
.form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 0.5rem;
    width: 100%;

}

.input {
    background: none;
    border: 0;
    outline: 0;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
}

.form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color 0.3s ease;
}

.form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
}

/*Button*/
.form button {
    margin: 0 auto;
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 8px;
    padding: 15px 16px;
    width: 70%;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.form button:hover {
    background-color: #005ce6;
}
</style>
