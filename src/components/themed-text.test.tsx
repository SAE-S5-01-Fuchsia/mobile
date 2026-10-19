import { render } from '@testing-library/react-native';

import { ThemedText } from './themed-text';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: () => '#123456',
}));

describe('ThemedText', () => {
  it('renders children text', () => {
    const { getByText } = render(<ThemedText>Bonjour test</ThemedText>);

    expect(getByText('Bonjour test')).toBeTruthy();
  });
});