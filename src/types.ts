export interface Word {
  uuid: string;
  kana: string;
  furigana: string;
  english: string;
  image: string;
}

export interface UserSettings {
  hideHiragana?: boolean;
  hideRomaji?: boolean;
  hideMeaning?: boolean;
  wordLibrary?: string;
}
export interface AppState {
  isModalOpen: boolean;
  isMenuOpen: boolean;
  word: Word | null;
  userSettings: UserSettings;
  fetchingNext: boolean;
  fetchSettings: boolean;
}

export interface Action<P = any> {
  type: string;
  payload?: P;
}
