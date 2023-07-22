import image1 from "../images/1.png";
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';
import image5 from '../images/5.jpg';

export const HEADERS = [
        "סוג התנדבות",
        "תאריך התחלה",
        "שעת התחלה",
        "תאריך סיום",
        "שעת סיום",
        "עיר",
        "רחוב",
        "תאור",
        "מחיקה",
        "עריכה",
    ],
    MAX_DESCRIPTION_LEN = 50,
    DATE_FORMATE = 'DD-MM-YYYY HH:mm',
    AGE_OPTIONS = [
        {label: 'כל הגילאים', value: 'all'},
        {label: '18-30', value: '18-30'},
        {label: '31-40', value: '31-40'},
        {label: '41-50', value: '41-50'},
    ],

    GENDER_OPTIONS = [
        {label: 'כל המינים', value: 'all'},
        {label: 'גבר', value: 'male'},
        {label: 'אישה', value: 'female'},
    ],
    STASUSES = [
        {
            id: 1,
            name: 'approve',
        },
        {
            id: 2,
            name: 'not approve',
        },
        {
            id: 3,
            name: 'pending',
        },
    ],
    DEFAULT_VALUE = '-1',

    DEFAULT_FILTERS = {
        type: DEFAULT_VALUE,
        city: DEFAULT_VALUE,
        startDate: DEFAULT_VALUE,
        endDate: DEFAULT_VALUE
    },

    IMAGES_TYPES = {
        'ילדים': image1,
        'מבוגרים': image2,
        'תנו לחיות לחיות': image3,
        'חלוקת מזון': image4,
        'רפואה': image5
    };

