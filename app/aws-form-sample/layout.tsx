'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, formSchema } from '../types/FormData';

export default function Layout({ children }: {children: React.ReactNode}) {
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>
}