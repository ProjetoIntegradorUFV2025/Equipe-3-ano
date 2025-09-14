import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { beforeEach, afterEach, test, vi } from 'vitest'
import App from './App'

// Mock global do fetch
beforeEach(() => {
  global.fetch = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('renderiza App e BotaoCliques com total inicial', async () => {
  // Mock da resposta inicial da API
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => 5, // total inicial
  })

  render(<App />)

  // Espera que o total inicial seja exibido
  await waitFor(() =>
    expect(screen.getByText('Total de Cliques: 5')).toBeInTheDocument()
  )

  // Verifica se o botão existe
  const botao = screen.getByRole('button', { name: /clicar/i })
  expect(botao).toBeInTheDocument()
})

test('incrementa total de cliques ao clicar no botão', async () => {
  // Mock da resposta inicial da API
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => 0,
  })

  render(<App />)

  const botao = await screen.findByRole('button', { name: /clicar/i })

  // Mock da resposta do clique
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => 1, // novo total após o clique
  })

  fireEvent.click(botao)

  // Espera que o total seja atualizado
  await waitFor(() =>
    expect(screen.getByText('Total de Cliques: 1')).toBeInTheDocument()
  )
})

test('trata erro ao buscar total inicial de cliques', async () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  fetch.mockRejectedValueOnce(new Error('API falhou'))

  render(<App />)

  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith(
      'Erro ao buscar total de cliques:',
      expect.any(Error)
    )
  )

  consoleSpy.mockRestore()
})

test('trata erro ao registrar clique', async () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  // Resposta inicial válida
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => 0,
  })

  render(<App />)
  const botao = await screen.findByRole('button', { name: /clicar/i })

  // Mock de erro ao clicar
  fetch.mockRejectedValueOnce(new Error('Falha ao clicar'))

  fireEvent.click(botao)

  await waitFor(() =>
    expect(consoleSpy).toHaveBeenCalledWith(
      'Erro ao registrar clique:',
      expect.any(Error)
    )
  )

  consoleSpy.mockRestore()
})

