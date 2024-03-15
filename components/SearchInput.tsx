'use client';
import type { ChangeEventHandler } from 'react';

import { TextFieldRoot, TextFieldInput } from '@radix-ui/themes';

type SearchInputProps = {
  searchValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput = ({ searchValue, onChange }: SearchInputProps) => {
  return (
    <TextFieldRoot>
      <TextFieldInput
        placeholder="Search for a movie title"
        value={searchValue}
        onChange={onChange}
      />
    </TextFieldRoot>
  );
};
