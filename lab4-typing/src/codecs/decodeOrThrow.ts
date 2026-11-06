import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import type * as t from 'io-ts'
import { PathReporter } from 'io-ts/PathReporter'

/** Ошибка несоответствия данных кодеку; подробности по каждому полю лежат в `details`. */
export class DecodeError extends Error {
  constructor(public readonly details: string[]) {
    super('Ответ API не соответствует ожидаемому формату')
    this.name = 'DecodeError'
  }
}

/**
 * Декодирует неизвестные данные кодеком io-ts.
 * Either<Errors, A> разворачивается через fp-ts: Right -> значение, Left -> DecodeError.
 */
export function decodeOrThrow<A, O>(codec: t.Type<A, O, unknown>, input: unknown): A {
  return pipe(
    codec.decode(input),
    E.fold<t.Errors, A, A>(
      (errors) => {
        throw new DecodeError(PathReporter.report(E.left(errors)))
      },
      (value) => value,
    ),
  )
}
