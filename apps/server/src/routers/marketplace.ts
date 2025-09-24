// this component is for make route with zod and prisma for marketplace
import { z } from "zod";
import { publicProcedure,router } from "@/lib/trpc";

export const marketplaceRouter = router({
    createProduct: publicProcedure.input(
        z.object({
            title: z.string(),
            description: z.string(),
            price: z.number().min(0),
            sellerId: z.string()
        })
    )
    .mutation(async ({ input, ctx }) => {

        const product = await ctx.db.product.create({
            data: input
        });
        return product;
    }),
    getProducts: publicProcedure.query(async({ctx})=>{
          const products = await ctx.db.product.findMany()
          return products
    })
})
