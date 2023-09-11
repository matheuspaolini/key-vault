import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { KeyIcon } from './svg/key-icon';

export function Header() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <KeyIcon className="w-10 h-10 fill-green-500" />
        <h1 className="text-4xl font-bold font-space-mono text-green-500">
          Key Vault
        </h1>
      </div>
      <p className="text-neutral-500 font-space-mono mt-2">
        Easily generate secure passwords.
      </p>

      <p className="text-neutral-500 group font-space-grotesk w-fit text-sm mt-2 flex items-center gap-2">
        by
        <a
          href="https://github.com/matheuspaolini"
          className="text-sm flex items-center gap-2 group-hover:text-green-500"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <GitHubLogoIcon className="w-4 h-4" /> @matheuspaolini
        </a>
      </p>
    </div>
  );
}
