import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionModalSchema = zod.object({
    description: zod.string().min(1),
    price: zod.number().positive(),
    category: zod.string().min(1),
    // type: zod.enum(["income", "outcome"])
})

type NewTransactionModalInputs = zod.infer<typeof newTransactionModalSchema>

export function NewTransactionModal() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<NewTransactionModalInputs>({
        resolver: zodResolver(newTransactionModalSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionModalInputs) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
                    />
                    <input
                        type="text"
                        placeholder="Preço"
                        required
                        {...register("price", { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register("category")}
                    />

                    <TransactionType>
                        <TransactionTypeButton value="income" variant="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton value="outcome" variant="outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}