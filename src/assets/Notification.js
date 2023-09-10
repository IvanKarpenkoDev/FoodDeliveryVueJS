import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
class Notification{
    error(text){
        toast.error(text, {
            autoClose: 4000,
            theme: 'dark',
            position: toast.POSITION.BOTTOM_RIGHT,
        }, 1000);
    }
}
export default new Notification ()