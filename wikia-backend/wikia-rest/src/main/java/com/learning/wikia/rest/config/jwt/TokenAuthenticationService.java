package com.learning.wikia.rest.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learning.wikia.core.logging.ILogger;
import com.learning.wikia.core.logging.LogManager;
import com.learning.wikia.persistence.repositories.UserRepository;
import com.learning.wikia.rest.config.authentication.WikiaUserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

class TokenAuthenticationService {

    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    // this should be moved in a separate file
    static final String SECRET = "ThisIsASecret";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";
    private static ObjectMapper mapper = new ObjectMapper();
    private static final ILogger LOG = LogManager.getLogger(TokenAuthenticationService.class);

    static void addAuthentication(HttpServletResponse res, WikiaUserDetails user){
        try {
            String JWT = Jwts.builder()
                    .setSubject(user.getUsername())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();
            res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
        } catch ( Exception e ) {
            LOG.error(e);
        }
    }

    static Authentication getAuthentication(HttpServletRequest request, UserRepository repository){
        try {
            String token = request.getHeader(HEADER_STRING);
            if (token != null) {
                String username = Jwts.parser()
                        .setSigningKey(SECRET)
                        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                        .getBody()
                        .getSubject();
                WikiaUserDetails currentUser = new WikiaUserDetails(repository.findOneByUsername(username));
                return username != null ? new UsernamePasswordAuthenticationToken(currentUser, currentUser.getPassword(), currentUser.getAuthorities()) : null;
            }
            return null;
        } catch ( Exception e ){
            LOG.error(e);
            return null;
        }
    }
}
