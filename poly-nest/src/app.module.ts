import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendingMachineProductDbEntity } from './vending-machine-products/entities/vending-machine-product.db-entity';
import { VendingMachineProductsModule } from './vending-machine-products/vending-machine-products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://lukaculic:B1JpsUFDxm1S4ZT3@cluster0.kmvubhi.mongodb.net/poly-link?retryWrites=true&w=majority`,
      entities: [VendingMachineProductDbEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    VendingMachineProductsModule,
  ],
  providers: [],
})
export class AppModule {}
