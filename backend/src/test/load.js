import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 5 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    }
}

export default function () {
    const res = http.get('http://localhost:3000/api/interview/report/000000000000000000000000', {
        tags: { expectedStatus: '401' },
    })

    check(res, {
        'server is up': (r) => r.status !== 0,
        'no 5xx errors': (r) => r.status < 500,
        'response time < 500ms': (r) => r.timings.duration < 500,
    })

    sleep(1)
}