import type { ITheme } from '../types/theme.types';

export const themes: ITheme = {
  dark: {
    screen: '#1b1e27',
    background: '#101217',
    main_text: '#E8EEFF',
    second_text: '#565d6f',
    card_color: '#171b24',
    forecast_info_card_color: '#0f1115',
    text_input_color: '#101116',
    text_input_placeholder_color: '#3a4753',
    card_border_color: '#1B1D25',
    weather_info_card_color: '#1c2029',
  },
  light: {
    screen: '#ffffff',
    background: '#f2f2f2',
    main_text: '#313131',
    second_text: '#848484',
    card_color: '#fcfcfc',
    forecast_info_card_color: '#f4f4f4',
    text_input_color: '#f2f2f2',
    text_input_placeholder_color: '#9f9f9f',
    card_border_color: '#ffffff',
    weather_info_card_color: '#f8f8f8',
  },
};
