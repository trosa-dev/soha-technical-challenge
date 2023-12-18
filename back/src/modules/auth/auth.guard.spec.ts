import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

// Describe block to group related test cases
describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtServiceMock: JwtService;

  // Setup block to run before each test case
  beforeEach(async () => {
    // Mocking JwtService for testing purposes
    jwtServiceMock = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService;

    // Creating a testing module with AuthGuard and JwtService mock
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, { provide: JwtService, useValue: jwtServiceMock }],
    }).compile();

    // Getting an instance of AuthGuard from the module
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  // Test case: checking if AuthGuard is defined
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  // Test case: checking if UnauthorizedException is thrown when no authorization header is provided
  it('should throw UnauthorizedException when no authorization header is provided', async () => {
    // Creating a mock execution context with no authorization header
    const context = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
    } as unknown as ExecutionContext;

    // Expecting the canActivate method to throw UnauthorizedException
    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  // Test case: checking if UnauthorizedException is thrown when authorization type is not Bearer
  it('should throw UnauthorizedException when authorization type is not Bearer', async () => {
    // Creating a mock execution context with an invalid authorization token
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'InvalidToken' } }),
      }),
    } as unknown as ExecutionContext;

    // Expecting the canActivate method to throw UnauthorizedException
    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
