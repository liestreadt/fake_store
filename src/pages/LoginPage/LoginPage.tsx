import { FC, memo, useCallback, useMemo, useState } from 'react';
import { InputField } from '../../components/Form/InputField/InputField';
import { BaseForm } from '../../components/Form/BaseForm/BaseForm';
import { ELoginPageState } from './LoginPage.types';
import { Box, Button, Container, Link } from '@mui/material';
import { SelectField, SelectFieldOption } from '../../components/Form/SelectField/SelectField';

export const LoginPageComponent: FC = () => {
    const [loginState, setLoginState] = useState(ELoginPageState.LOGIN);

    const handleLoginStateClick = useCallback(() => {
        setLoginState((prev) => {
            if (prev === ELoginPageState.LOGIN) {
                return ELoginPageState.REGISTER;
            }

            return ELoginPageState.LOGIN;
        });
    }, []);

    const loginStateContent = useMemo(() => {
        return (
            <>
                <InputField required={true} name={'Login'} type="text" labelNode={'Введите Логин'} />
                <InputField required={true} name={'Password'} type="password" labelNode={'Введите Пароль'} />
                <InputField name={'RememberUser'} type="checkbox" labelNode={'Запомнить меня'} />
                <SelectField defaultValue={'asd'} required name="Select">
                    <SelectFieldOption value="123" />
                    <SelectFieldOption value="asd" />
                    <SelectFieldOption value="zxc" />
                </SelectField>
                <Button type="submit" variant="contained">
                    Войти
                </Button>
            </>
        );
    }, []);

    const registerStateContent = useMemo(() => {
        return (
            <>
                <InputField required={true} name={'Login'} type="text" labelNode={'Введите Логин'} />
                <InputField name={'Name'} type="text" labelNode={'Введите Имя'} />
                <InputField name={'Email'} type="email" labelNode={'Введите e-mail'} />
                <InputField required={true} name={'Password'} type="password" labelNode={'Введите Пароль'} />
                <InputField required={true} name={'PasswordRepeat'} type="password" labelNode={'Повторите Пароль'} />
                <Button type="submit" variant="contained">
                    Регистрация
                </Button>
            </>
        );
    }, []);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <BaseForm>{loginState === ELoginPageState.LOGIN ? loginStateContent : registerStateContent}</BaseForm>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button variant="text" onClick={handleLoginStateClick}>
                    <Link>
                        {loginState === ELoginPageState.LOGIN ? ELoginPageState.REGISTER : ELoginPageState.LOGIN}
                    </Link>
                </Button>
                <Button variant="text">
                    <Link>Забыли пароль?</Link>
                </Button>
            </Box>
        </Container>
    );
};

export const LoginPage = memo(LoginPageComponent);
