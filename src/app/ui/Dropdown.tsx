'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DropdownItem {
  label: string
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  items: DropdownItem[]
  buttonLabel: string
}

export default function Dropdown({ items, buttonLabel }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="text-white bg-primary hover:bg-primaryLight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        {buttonLabel}
        <svg
          className="w-3 h-3 ms-3 transition-transform [data-state=open]:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        sideOffset={5}
        className="mt-2 w-44 bg-card divide-y divide-gray-100 rounded-lg shadow-md z-50"
      >
        {items.map((item, index) => (
          <DropdownMenu.Item key={index} asChild>
            {item.href ? (
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-text hover:bg-primaryLight rounded"
              >
                {item.label}
              </a>
            ) : (
              <button
                className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primaryLight rounded"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
