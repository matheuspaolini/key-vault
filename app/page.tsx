'use client';

import { LoopIcon } from '@/components/svg/loop-icon';

import { Header } from '@/components/header';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

import { numbers } from '@/constants/numbers';
import { symbols } from '@/constants/symbols';
import { uppercases } from '@/constants/uppercases';
import { lowercases } from '@/constants/lowercases';

import { getRandomPassword } from '@/functions/get-random-password';

import { cn } from '@/lib/utils';

import { ClipboardIcon } from '@radix-ui/react-icons';

import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [passwordLength, setLength] = useState(8);

  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSymbols, setHasSymbols] = useState(false);

  const { toast } = useToast();

  const [ms, setMs] = useState(null as null | number);

  const everyFilter = useMemo(
    () => [hasNumbers, hasUpperCase, hasLowerCase, hasSymbols],
    [hasLowerCase, hasNumbers, hasSymbols, hasUpperCase]
  );

  console.log(password);

  const scorePoints = everyFilter
    .map((filter) => (filter ? Number(25) : Number(0)))
    .reduce((previous, next) => previous + next);

  const charList = [
    ...((hasUpperCase && uppercases) || []),
    ...((hasLowerCase && lowercases) || []),
    ...((hasSymbols && symbols) || []),
    ...((hasNumbers && numbers) || []),
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast({ title: 'Password copied to clipboard!' });
    } catch (error) {
      toast({
        title: 'Error copying password to clipboard!',
      });
    }
  };

  const handleGeneratePassword = () => {
    const start = performance.now();

    const password = getRandomPassword({ charList, passwordLength });
    setPassword(password);

    console.log(password);

    const end = performance.now();

    const ms = end - start;

    setMs(ms);
  };

  useEffect(() => {
    const isNoneSelected = everyFilter.every((value) => !value);

    if (isNoneSelected) {
      setHasUpperCase(true);
      setHasNumbers(true);
    }
  }, [everyFilter]);

  return (
    <main className="w-full h-full grid place-items-center p-8 md:p-16">
      <div className="w-full max-w-3xl pb-8">
        <Header />

        <div className="flex-col flex sm:flex-row w-full items-center gap-4 mt-16">
          <div className="w-full overflow-hidden shadow-inner border h-12 px-8 rounded-md flex items-center justify-center">
            {password ? (
              password.split('').map((char) => {
                if (symbols.includes(char))
                  return <span className="text-blue-500">{char}</span>;

                if (numbers.includes(char))
                  return <span className="text-green-500">{char}</span>;

                if (uppercases.includes(char))
                  return <span className="text-emerald-500">{char}</span>;

                if (lowercases.includes(char))
                  return <span className="text-teal-500">{char}</span>;
              })
            ) : (
              <span className="text-neutral-800">Generate a new password!</span>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-fit">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 shrink-0"
              onClick={handleCopy}
            >
              <ClipboardIcon className="w-4 h-4" />
            </Button>

            <Button
              className="h-12 w-full md:w-[120px] bg-green-500 hover:bg-green-600"
              variant="secondary"
              onClick={handleGeneratePassword}
            >
              <LoopIcon className="w-4 h-4 fill-current mr-2" /> Generate
            </Button>
          </div>
        </div>

        <small className="text-neutral-500 mt-4 font-space-mono text-xs">
          {typeof ms === 'number' && ms !== 0 ? ms / 1000 : '> 0.0009'}s
        </small>

        <div className="mt-16 w-full">
          <p className="font-space-mono text-sm">Password Strength</p>

          <div className="mt-4 w-full flex items-center gap-4">
            <div
              className={cn(
                'relative transition-all',
                'w-full bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-md h-2'
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 z-10 w-full bg-gradient-to-r from-red-500 to-red-600 rounded-md h-2 transition-all',
                  scorePoints > 20 ? 'opacity-100' : 'opacity-0'
                )}
              />
            </div>

            <div
              className={cn(
                'relative transition-all',
                'w-full bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-md h-2'
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 z-10 w-full bg-gradient-to-r from-orange-600 to-orange-500 rounded-md h-2 transition-all',
                  scorePoints > 40 ? 'opacity-100' : 'opacity-0'
                )}
              />
            </div>

            <div className="relative transition-all w-full bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-md h-2">
              <div
                className={cn(
                  'absolute inset-0 z-10 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-md h-2 transition-all',
                  scorePoints > 60 ? 'opacity-100' : 'opacity-0'
                )}
              />
            </div>

            <div className="relative transition-all w-full bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-md h-2">
              <div
                className={cn(
                  'absolute inset-0 z-10 w-full bg-gradient-to-r from-green-600 to-green-500 rounded-md h-2 transition-all',
                  scorePoints > 70 ? 'opacity-100' : 'opacity-0'
                )}
              />
            </div>

            <div className="relative transition-all w-full bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-md h-2">
              <div
                className={cn(
                  'absolute inset-0 z-10 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-md h-2 transition-all',
                  scorePoints >= 100 ? 'opacity-100' : 'opacity-0'
                )}
              />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="mt-8 w-full">
          <p className="font-space-mono text-sm">
            Char Length: {passwordLength}
          </p>

          <Slider
            value={[passwordLength]}
            className="mt-4"
            min={8}
            max={128}
            onValueChange={(length) => setLength(length[0])}
          />
        </div>

        <Separator className="my-8" />

        <div className="mt-8 w-full">
          <p className="font-space-mono text-sm">Settings</p>

          <div className="mt-4 w-full grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Checkbox
                id="Numeric"
                checked={hasNumbers}
                onCheckedChange={(value) => setHasNumbers(Boolean(value))}
              />
              <Label htmlFor="Numeric" className="text-base font-space-mono">
                Numeric
              </Label>
            </div>

            <div className="flex items-center gap-4">
              <Checkbox
                id="Uppercase"
                checked={hasUpperCase}
                onCheckedChange={(value) => setHasUpperCase(Boolean(value))}
              />
              <Label htmlFor="Uppercase" className="text-base font-space-mono">
                Uppercase
              </Label>
            </div>

            <div className="flex items-center gap-4">
              <Checkbox
                id="Lowercase"
                checked={hasLowerCase}
                onCheckedChange={(value) => setHasLowerCase(Boolean(value))}
              />
              <Label htmlFor="Lowercase" className="text-base font-space-mono">
                Lowercase
              </Label>
            </div>

            <div className="flex items-center gap-4">
              <Checkbox
                id="Symbols"
                checked={hasSymbols}
                onCheckedChange={(value) => setHasSymbols(Boolean(value))}
              />
              <Label htmlFor="Symbols" className="text-base font-space-mono">
                Symbols
              </Label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
