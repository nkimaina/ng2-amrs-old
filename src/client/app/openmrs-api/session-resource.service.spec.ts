/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SessionResourceService } from './session-resource.service';

export function main() {

  describe('Service: SessionResource', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: Http, useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }, deps: [MockBackend, BaseRequestOptions]
          },
          SessionResourceService,
          MockBackend,
          BaseRequestOptions
        ]
      });
    });

    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('should be injected with all dependencies',
      inject([SessionResourceService], (service: SessionResourceService) => {
        expect(service).toBeTruthy();
        // expect(service.http).toBeTruthy();
        // console.log('http', service.http);
      }));

    it('should fetch the current session from server: using async', async(() => {
      let service: SessionResourceService = TestBed.get(SessionResourceService);
      let backend: MockBackend = TestBed.get(MockBackend);
      let http = TestBed.get(Http);

      const mockSession = {
        uuid: 'some-uuid',
        isAuthenticated: false
      };

      // actual mocking
      backend.connections.subscribe(
        (connection: MockConnection) => {
          // check for the right correct url 
          expect(connection.request.url).toMatch('http://10.7.18.21:8080/api/ws/v1/session');
          expect(connection.request.method).toEqual(RequestMethod.Get);
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: mockSession
              })
            )
          );
        });


      // try calling the service
      service.getSession().then(
        (session) => {
          //console.log('session', session);
          expect(session.uuid).toBe(mockSession.uuid);
          backend.verifyNoPendingRequests();
        }
      );
    }));

    it('should fetch the current session from server', (done) => {
      let service: SessionResourceService = TestBed.get(SessionResourceService);
      let backend: MockBackend = TestBed.get(MockBackend);
      let http = TestBed.get(Http);

      const mockSession = {
        uuid: 'some-uuid',
        isAuthenticated: false
      };

      // actual mocking
      backend.connections.subscribe(
        (connection: MockConnection) => {
          // check for the right correct url and method
          expect(connection.request.url).toMatch('http://10.7.18.21:8080/api/ws/v1/session');
          expect(connection.request.method).toEqual(RequestMethod.Get);
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: mockSession
              })
            )
          );
        });


      // try calling the service
      service.getSession().then(
        (session) => {
          // console.log('session', session);
          expect(session.uuid).toBe(mockSession.uuid);
          backend.verifyNoPendingRequests();
          done();
        }
      );
    });

    it('should reject promise when fetching session fails', (done) => {
      let service: SessionResourceService = TestBed.get(SessionResourceService);
      let backend: MockBackend = TestBed.get(MockBackend);
      let http = TestBed.get(Http);

      // actual mocking
      backend.connections.subscribe(
        (connection: MockConnection) => {
          // check for the right correct url and method
          expect(connection.request.url).toMatch('http://10.7.18.21:8080/api/ws/v1/session');
          expect(connection.request.method).toEqual(RequestMethod.Get);
          connection.mockError(new Error('An error occured while processing the request'));
        });

      // try calling the service
      service.getSession().then(
        (session) => {
          // if control comes here, then it's an error!
          throw new Error('Test failed. Promise resolved instead of rejecting');
        })
        .catch(
        (error) => {
          expect(error).toBeTruthy();
          done();
        });

    });

    it('should delete current session from server', (done) => {
      let service: SessionResourceService = TestBed.get(SessionResourceService);
      let backend: MockBackend = TestBed.get(MockBackend);
      let http = TestBed.get(Http);

      const mockResponse = new Response(
        new ResponseOptions(
          {
            status: 200
          }
        )
      );

      // actual mocking
      backend.connections.subscribe(
        (connection: MockConnection) => {
          // check for the right correct url and method
          expect(connection.request.url).toMatch('http://10.7.18.21:8080/api/ws/v1/session');
          expect(connection.request.method).toEqual(RequestMethod.Delete);
          connection.mockRespond(mockResponse);
        });


      // try calling the service
      service.deleteSession().then(
        (sessionDeleted) => {
          // console.log('session', session);
          expect(sessionDeleted).toBe(true);
          backend.verifyNoPendingRequests();
          done();
        }
      );
    });

  });

}
