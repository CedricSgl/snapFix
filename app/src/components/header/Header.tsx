
import { Anchor, Button, Group, Text, Title, Image } from '@mantine/core';
import logo from "../../assets/react.svg"

export function Header() {
    let datas = {
        title: 'Mon Titre',
        buttonProducts: 'Products',
        buttonSignIn: 'Sign in',
        buttonRegister: 'Register'
    }
    let links = [{title : "Accueil", href : "/"},{title : "Immos", href : "/"}]

    return (
                <Group justify='space-between' align='center' style={{margin: "0px 10px", height: "100%"}}>
                    <Group><Image src={logo} style={{flex:"0 0 55px", padding:"10px"}}/></Group>
                    <Group justify='flex-en d'>
                    </Group>
                    <Group mih={50} gap="xs" justify="flex-end" align="center" wrap="wrap">
                        {links.map((value, index) => {
                            return(<Anchor key={index} href={value.href}>{value.title}</Anchor>)
                        })}
                        <Anchor>Where is the map ?</Anchor>
                        <Button variant="default">{datas.buttonProducts}</Button>
                        <Button variant="default">{datas.buttonSignIn}</Button>
                        <Button variant="filled">{datas.buttonRegister}</Button>
                    </Group>
                </Group>
    )
}
