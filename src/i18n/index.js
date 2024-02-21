import { mergeTranslations } from 'react-admin';
import treeEnglishMessages from 'ra-tree-language-english';
import englishMessages from './en';
import koreanMessages from './ko';
import chineseMessages from './cn';

const messages = {
     en: mergeTranslations(englishMessages, treeEnglishMessages),
     ko: koreanMessages,
     cn: chineseMessages,
}
export default messages