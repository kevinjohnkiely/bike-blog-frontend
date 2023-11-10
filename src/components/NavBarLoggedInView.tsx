import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as PostsApi from '../api/postsAPI';

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccess: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccess }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await PostsApi.logout();
            onLogoutSuccess();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;