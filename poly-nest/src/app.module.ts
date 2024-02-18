import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendingMachineProductDbEntity } from './vending-machine-products/entities/vending-machine-product.db-entity';
import { VendingMachineProductsModule } from './vending-machine-products/vending-machine-products.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}/${process.env.MONDO_DB_NAME}?retryWrites=true&w=majority`,
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
