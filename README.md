# AKI! Function – Institution Notification Reader

Azure Function que simula a instituição lendo notificações publicadas na fila Service Bus `notify_institution`.

## Objetivo
Consumir mensagens geradas pela função de notificação (`aki_function_notify_institution`), validá-las e exibir/logar o processamento para testes de integração.

## Fluxo
1. Trigger Service Bus (queue) `notify_institution`.
2. Deserialização do corpo da mensagem (JSON).
3. Validação (Zod) do schema esperado.
4. Log estruturado do processamento (sucesso ou erro).
5. Possível extensão futura: persistir, métricas, retries customizados.

## Schema da Mensagem
```ts
{
  notification_id: number; // id gerado na função publicadora
  class_id?: number | null; // pode vir nulo
  teacher_id: number;
  message: string; // <= 500 chars
}
```

## Variáveis de Ambiente
| Nome | Descrição |
| ---- | --------- |
| `SERVICE_BUS_CONNECTION_STRING` | Connection string da namespace Service Bus (RootManagedSharedAccessKey ou política específica). |
| `AzureWebJobsStorage` | Storage para runtime local. |

> O nome da fila está embutido em `function.json` (`notify_institution`). Ajuste se publisher mudar.

## Início Rápido
```bash
cp local.settings.json local.settings.dev.json # opcional backup
npm install
npm run build
func start
```
A função começará a consumir mensagens existentes na fila.

## Logs
Utiliza logger simples (`src/shared/logger.ts`) com níveis: info, warn, error.

## Próximos Passos Sugeridos
- Persistir notificações consumidas.
- Expor métricas Prometheus.
- Adicionar correlação (passar `x-correlation-id` se vier no message body).
- Dead-letter handling avançado.

## Autores
Camila Delarosa

Dimitri Delinski

Guilherme Belo

Yasmin Carmona

## Licença
MIT
