import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@lib/utils';

import { Button } from '@ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';

type Currency = {
  value: string;
  label: string;
  symbol: string;
};

const currencies: Currency[] = [
  { value: 'usd', label: 'USD', symbol: '$' },
  { value: 'eur', label: 'EUR', symbol: '€' },
  { value: 'gbp', label: 'GBP', symbol: '£' },
  { value: 'jpy', label: 'JPY', symbol: '¥' },
  { value: 'cad', label: 'CAD', symbol: 'C$' },
  { value: 'aud', label: 'AUD', symbol: 'A$' },
  { value: 'chf', label: 'CHF', symbol: 'CHF' },
  { value: 'cny', label: 'CNY', symbol: '¥' },
  { value: 'inr', label: 'INR', symbol: '₹' },
  { value: 'brl', label: 'BRL', symbol: 'R$' },
];

export const NavigationCurrency = () => {
  const defaultCurrency = currencies.find((currency) => currency.value === 'usd')!;

  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="justify-between dark:text-zinc-200"
          >
            {selectedCurrency ? (
              <span className="flex items-center gap-2">
                <span className="font-medium">{selectedCurrency.symbol}</span>
                <span>{selectedCurrency.label}</span>
              </span>
            ) : (
              'Select currency...'
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-44 p-0">
          <Command>
            <CommandInput placeholder="Search currency..." className="h-8 text-xs" />
            <CommandList className="max-h-[150px]">
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency.value}
                    value={currency.label}
                    onSelect={() => {
                      setSelectedCurrency(currency === selectedCurrency ? defaultCurrency : currency);
                      setOpen(false);
                    }}
                  >
                    <div className="flex">
                      <span className="w-10 font-semibold">{currency.symbol}</span>
                      <span className="pl-2">{currency.label}</span>
                    </div>
                    <Check
                      className={cn(
                        'ml-auto',
                        selectedCurrency?.label === currency.label ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
