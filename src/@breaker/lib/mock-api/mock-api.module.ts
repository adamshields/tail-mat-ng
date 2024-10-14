import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BreakerMockApiInterceptor } from './mock-api.interceptor';
import { BREAKER_MOCK_API_DEFAULT_DELAY } from './mock-api.constants';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: BreakerMockApiInterceptor,
            multi   : true
        }
    ]
})
export class BreakerMockApiModule
{
    /**
     * BreakerMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<BreakerMockApiModule>
    {
        return {
            ngModule : BreakerMockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : BREAKER_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
